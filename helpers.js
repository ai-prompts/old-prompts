const fs = require('fs')
const path = require('path')
const { faker } = require('@faker-js/faker')
const _ = require('underscore')

const listsPath = 'lists'
const allLists = fs
  .readdirSync(listsPath)
  .filter(file => path.extname(file) === '.txt')
  .map(file => file.split('.')[0])

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

const lists = (lists, listOptions) => {
  return lists.map(l => list(l, listOptions)).flat()
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

const cinematic = () => {
  return `${item('cinematic')}, ${item('cinematic-shot')}, ${item('cinematic-effect')}, ${item('cinematic-coloring')}`
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
  animal,
  artist,
  banned,
  cinematic,
  century,
  color,
  country,
  filterBanned,
  stripBannedWords,
  jobTitle,
  jobType,
  list,
  lists,
  listsStarting,
  item,
  fromAll,
  name,
  save,
  shuffle,
  trending,
  year
}
