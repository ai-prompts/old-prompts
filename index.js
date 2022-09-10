const { faker } = require('@faker-js/faker')
const fs = require('fs')

const getList = (listName) => {
  return fs.readFileSync(`lists/${listName}.txt`).toString().split('\n').filter(e => String(e).trim())
}

const randomFromList = (listname) => {
  return faker.helpers.arrayElement(getList(listname))
}

for (let i = 0; i < 100; i++) {
  console.log(`A landscape photo of ${randomFromList('scenes')}, ${randomFromList('scene-modifiers')}, ${randomFromList('scene-modifiers')}, ${randomFromList('time-of-day')}, ${faker.address.country()}, ${randomFromList('lenses')}`)
}
