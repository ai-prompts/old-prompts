const fs = require('fs')
const path = require('path')
const { faker } = require('@faker-js/faker')
const _ = require('underscore')

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
  const excludes = options.excludes || []
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

const painting = () => {
  return `${item('painting-technique')}, ${item('painting-combination')}, ${item('palette')}`
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

module.exports = {
  adjectiveNoun,
  animal,
  artist,
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
  fromAll,
  name,
  save,
  painting,
  shuffle,
  trending,
  year
}
