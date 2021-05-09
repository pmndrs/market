import fs from 'fs'
import path from 'path'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()

const dev = process.env.NODE_ENV !== 'production'

const materialsPath = `${dev ? './public/' : './'}materials/basic-1/info.json`

export default function handler(req, res) {
  const a = fs.readFileSync(materialsPath)

  res.status(200).json(a)
}
