const fs = require('fs')
const dir = fs.opendirSync('lists')
let file

while ((file = dir.readSync()) !== null) {
  let list = fs.readFileSync(`lists/${file.name}`)
    .toString()
    .toLowerCase()
    .split('\n')
    .filter(e => String(e).trim())
    .map(e => e.replace(/^\s+-\s+|^-\s+|^\s+/g, ''))

  // Dedupe
  list = [...new Set(list)]

  // Sort
  list.sort((a, b) => a.localeCompare(b))

  const writeStream = fs.createWriteStream(`lists/${file.name}`)
  const pathName = writeStream.path

  // write each value of the array on the file breaking line
  list.forEach(value => writeStream.write(`${value}\n`))

  // the finish event is emitted when all data has been flushed from the stream
  writeStream.on('finish', () => {
    console.log(`Wrote all the array data to file ${pathName}`)
  })

  // handle the errors on the write process
  writeStream.on('error', (err) => {
    console.error(`There is an error writing the file ${pathName} => ${err}`)
  })

  // close the stream
  writeStream.end()
}
dir.closeSync()
