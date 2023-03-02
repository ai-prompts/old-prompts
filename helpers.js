import fs from 'fs'
import path from 'path'
import { faker } from '@faker-js/faker'
import _ from 'underscore'

const listsPath = 'lists'
const allLists = fs
  .readdirSync(listsPath)
  .filter(file => path.extname(file) === '.txt')
  .map(file => file.split('.')[0])

const readListFile = (listName) => {
  return fs.readFileSync(`lists/${listName}.txt`).toString().split('\n').filter(e => String(e).trim())
}

const list = (listName, opt) => {
  const options = opt || {}
  const excludes = options.excludes || ["'", "#"]
  const includes = options.includes || []
  const banned = readListFile('midjourney-banned')
  let l = readListFile(listName)

  if (!options.allowBanned) {
    l = l.filter((i) => {
      return !banned.some(b => i.includes(b))
    })
  }

  if (includes.length > 0) {
    l = l.filter((i) => {
      return includes.some(include => i.includes(include))
    })
  }

  if (excludes.length > 0) {
    l = l.filter((i) => {
      return !excludes.some(exclude => i.includes(exclude))
    })
  }

  return l
}

const lists = (lists, listOptions) => {
  return lists.map(l => list(l, listOptions)).flat()
}

const itemsFromRandomLists = (numberOfItems, numberOfLists) => {
  const items = []
  const listsToSample = allLists.filter(l => !['midjourney-banned', 'temp'].includes(l))
  const randomLists = _.sample(listsToSample, numberOfLists)

  randomLists.forEach((l) => {
    items.push(item(l, numberOfItems))
  })

  return _.flatten(items).join(', ').trim()
}

const listsStarting = (start, listOptions) => {
  return lists(allLists.filter(l => l.startsWith(start)), listOptions)
}

const fromAll = (start, count = 1, listOptions) => {
  if (typeof count === 'object') {
    listOptions = count
    count = 1
  }

  return _.sample(listsStarting(start, listOptions), count).join(', ').trim()
}

const colors = []
list('color').forEach((c) => {
  list('color-modifier').forEach((m) => {
    colors.push(`${m} ${c}`)
  })
})

const item = (listName, count = 1, listOptions = {}) => {
  if (typeof count === 'object') {
    listOptions = count
    count = 1
  }

  return _.sample(list(listName, listOptions), count).join(', ').trim()
}

const adjectiveNoun = () => {
  return `${item('word-adjective')} ${item('word-noun')}`
}

const color = (count = 1) => {
  return _.sample(colors, count).join(', ')
}

const cinematic = () => {
  return `${item('cinematic')}, ${item('cinematic-shot')}, ${item('cinematic-effect')}, ${item('cinematic-coloring')}`
}

const painting = () => {
  return `${item('painting-technique')} technique, ${item('painting-combination')}`
}

const country = () => {
  return faker.address.country()
}

const name = () => {
  return faker.name.fullName()
}

const jobTitle = () => {
  return faker.name.jobTitle()
}

const jobType = () => {
  return faker.name.jobType()
}

const getRandomNumberInRange = (min, max) => {
  return parseInt(Math.random() * (max - min) + min)
}

const year = (min = 1890, max = 2050) => {
  return getRandomNumberInRange(min, max)
}

const century = (min = 10, max = 25) => {
  return getRandomNumberInRange(min, max) * 100
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// example usage:
// eachItem('cinematic', c => prompts.push(`a ${c}`))
const eachItem = (listName, callback) => {
  list(listName).forEach((i) => {
    callback(i)
  })
}

const save = (prompts, file = 'prompts.txt') => {
  fs.writeFileSync(file, prompts.join('\n'))
}

const camelCase = (str) => {
  return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() })
}


const listHelpers = {}

// make all lists available as methods
allLists.forEach((list) => {
  const method = camelCase(list)
  listHelpers[method] = (count) => {
    return item(list, count)
  }
})

// for all lists starting with the same word and then a hyphen
// e.g. 'word-adjective', 'word-noun'
// add a helper method 'wordAll' that returns a random item from all lists starting with 'word'
allLists.forEach((list) => {
  const parts = list.split('-')
  if (parts.length > 1) {
    const method = camelCase(parts[0]) + 'All'
    if (!listHelpers[method]) {
      listHelpers[method] = (count) => {
        return fromAll(parts[0], count)
      }
    }
  }
})

const helpers = {}

Object.assign(helpers, listHelpers, {
  adjectiveNoun,
  cinematic,
  century,
  color,
  country,
  jobTitle,
  jobType,
  list,
  lists,
  listsStarting,
  item,
  eachItem,
  itemsFromRandomLists,
  fromAll,
  name,
  save,
  painting,
  shuffle,
  year
})

export default helpers
