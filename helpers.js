const fs = require('fs')
const { faker } = require('@faker-js/faker')
const _ = require('underscore')

const list = (listName) => {
  return fs.readFileSync(`lists/${listName}.txt`).toString().split('\n').filter(e => String(e).trim())
}

const colors = []
list('color').forEach((c) => {
  list('color-modifier').forEach((m) => {
    colors.push(`${m} ${c}`)
  })
})

const lists = (lists) => {
  return lists.map(l => list(l)).flat()
}

const item = (listName, count = 1) => {
  return _.sample(list(listName), count).join(', ')
  // return faker.helpers.arrayElements(list(listName), count).join(', ')
}

const adjectiveNoun = () => {
  return `${item('word-adjective')} ${item('word-noun')}`
}

const artist = (count) => {
  return item('artist-full', count)
}

const trending = (count) => {
  return item('trending', count)
}

const color = (count) => {
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

module.exports = {
  adjectiveNoun,
  artist,
  century,
  color,
  country,
  jobTitle,
  jobType,
  list,
  lists,
  item,
  name,
  shuffle,
  trending,
  year
}
