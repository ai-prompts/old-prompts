const { faker } = require('@faker-js/faker')
const photoTypes = ['', '', '', 'close up ', 'candid ', 'street photography ']
const prompt = `!dream \
A ${faker.helpers.arrayElement(photoTypes)}portrait photo \
of ${faker.name.fullName()}, ${faker.name.jobType().toLowerCase()} \
in ${faker.address.country()}, by ${faker.name.fullName()} -n 9 -H 640`

console.log(prompt)
