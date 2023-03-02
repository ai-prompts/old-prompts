import fs from 'fs'

// function to open the workspace.js file, read the contents and print out lines that contain backticks
// extracting everything between the backticks
export default () => {
  const workspace = fs.readFileSync('workspace.js').toString().split('\n')
  const prompts = workspace.filter(line => line.includes('`'))
  const templates = new Set()
  prompts.forEach(p => {
    const template = p.split('`')[1]
    templates.add(template)
  })

  // append templates to a template file if the template does not already exist
  templates.forEach(t => {
    const templateFile = fs.readFileSync('templates.txt').toString().split('\n')
    if (!templateFile.includes(t)) {
      fs.appendFileSync('templates.txt', t)
    }
  })

  return templates
}
