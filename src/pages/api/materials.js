import fs from 'fs'
import path from 'path'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()

export default function handler(req, res) {
  const a = fs.readFileSync(
    path.join(serverRuntimeConfig.PROJECT_ROOT, './materials/basic-1/info.json')
  )

  res.status(200).json(a)
}
