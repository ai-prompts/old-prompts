#!/usr/bin/env node
import helpers from './helpers.js'
import workspace from './workspace.js'
import saveTemplate from './save-template.js'
const prompts = []

const times = (n, fn) => {
  for (let i = 0; i < n; i++) {
    fn()
  }
}

const finish = () => {
  // helpers.shuffle(prompts)
  prompts.forEach(p => console.log(p))
  helpers.save(prompts)
  saveTemplate()
}

times(50, () => prompts.push(workspace(helpers)))
finish()
