const fs = require('fs')
const _ = require('underscore')

const list = (listName) => {
  return fs.readFileSync(`lists/${listName}.txt`).toString().split('\n').filter(e => String(e).trim())
}

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
  list,
  lists,
  item,
  shuffle,
  trending
}
