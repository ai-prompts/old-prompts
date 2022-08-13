const { faker } = require('@faker-js/faker')
const prompt = `!dream \
A police mugshot \
of ${faker.name.fullName()} \
in ${faker.address.country()} -n 9 -H 640`

console.log(prompt)
