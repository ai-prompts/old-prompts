const fs = require('fs')
const { faker } = require('@faker-js/faker')
const _ = require('underscore')

const list = (listName, opt) => {
  const options = opt || {}
  const excludes = options.excludes || []
  const includes = options.includes || []
  let l = fs.readFileSync(`lists/${listName}.txt`).toString().split('\n').filter(e => String(e).trim())

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

const colors = []
list('color').forEach((c) => {
  list('color-modifier').forEach((m) => {
    colors.push(`${m} ${c}`)
  })
})

const lists = (lists, listOptions) => {
  return lists.map(l => list(l, listOptions)).flat()
}

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

let allItems = []
const all = (count, without = []) => {
  if (!Array.isArray(without)) {
    without = [without]
  }

  if (allItems.length === 0) {
    const dir = fs.opendirSync('lists')
    const allLists = []
    let file

    while ((file = dir.readSync()) !== null) {
      const listName = file.name.split('.')[0]
      if (!without.some(w => w === listName)) {
        allLists.push(listName)
      }
    }

    allItems = lists(allLists)
  }

  return _.sample(allItems, count).join(', ')
}

const artist = (count) => {
  return item('artist-full', count)
}

const animal = (count) => {
  return item('animal', count)
}

const trending = (count) => {
  return item('trending', count)
}

const color = (count = 1) => {
  return _.sample(colors, count).join(', ')
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

const save = (prompts, file = 'prompts.txt') => {
  fs.writeFileSync(file, prompts.join('\n'))
}

const filterBanned = (prompts) => {
  return prompts.filter((prompt) => {
    return !banned().some(b => prompt.includes(b))
  })
}

const stripBannedWords = (prompts) => {
  return prompts.map(prompt => {
    return banned().reduce((acc, bannedWord) => {
      return acc.replace(bannedWord, '')
    }, prompt).trim()
  })
}

const banned = () => {
  return list('midjourney-banned')
}

module.exports = {
  adjectiveNoun,
  all,
  animal,
  artist,
  banned,
  century,
  color,
  country,
  filterBanned,
  stripBannedWords,
  jobTitle,
  jobType,
  list,
  lists,
  item,
  name,
  save,
  shuffle,
  trending,
  year
}
