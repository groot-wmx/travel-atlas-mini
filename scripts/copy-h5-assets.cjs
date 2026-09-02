const { cpSync, existsSync, mkdirSync } = require('node:fs')
const { resolve } = require('node:path')

const source = resolve(__dirname, '../public/places')
const target = resolve(__dirname, '../dist-h5/places')

if (!existsSync(source)) {
  throw new Error(`Missing H5 image assets: ${source}`)
}

mkdirSync(target, { recursive: true })
cpSync(source, target, { recursive: true })
console.log('Copied travel photos to dist-h5/places')
