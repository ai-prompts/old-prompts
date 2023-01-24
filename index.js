const h = require('./helpers')
const prompts = []
const number = 10

/*

Generate your prompts here

For example:

h.list('artists').forEach((a) => {
  prompts.push(`a painting by ${a}`)
})

for (let i = 0; i < number; i++) {
  prompts.push(`${h.item('word-noun', 4)}, ${h.item('prayers', 5)}`)
}

*/

// h.shuffle(prompts)
prompts.forEach((p, i) => {
  console.log(`${p}`)
})
