#!/usr/bin/env zx
$.env.FORCE_COLOR = 1

import 'zx/globals'

const args = process.argv.slice(3);


let entry = args[0]

if (!entry) {
  throw new Error('Please provide a path to a file to compile')
}

if (!entry.endsWith('.ts')) {
  if (fs.existsSync(entry + '.ts')) {
    entry = entry + '.ts'
  } else {
    throw new Error('Entry file is not exists')
  }
}

const findInlines = (entry) => {
  const content = fs.readFileSync(entry, 'utf8')
  const matched = content.matchAll(/from.+'(?<module>.+)'/gm)
  const modules = []
  for (const match of matched) {
    if (match?.groups?.module) {
      modules.push(match.groups.module)
    }
  }
  return modules.join(',')
}

await $`npx dts-bundle-generator ${entry} -o ${path.basename(entry, '.ts')}.d.ts \
--external-inlines=${findInlines(entry)}  --inline-declare-externals --export-referenced-types false --no-banner`
