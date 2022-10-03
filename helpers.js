const fs = require('fs')
const { faker } = require('@faker-js/faker')

const getList = (listName) => {
  return fs.readFileSync(`lists/${listName}.txt`).toString().split('\n').filter(e => String(e).trim())
}

const getLists = (lists) => {
  return lists.map(l => getList(l)).flat()
}

const randomFromList = (listname, count = 1) => {
  return faker.helpers.arrayElements(getList(listname), count).join(', ')
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
  getList,
  getLists,
  randomFromList,
  shuffle
}
