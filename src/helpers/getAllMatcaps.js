import path from 'path'
import fs from 'fs'
import { getSize } from './getFileSize'

const getAllMatcaps = () => {
  const resources = path.join(process.cwd(), 'public/matcaps')
  const folders = fs.readdirSync(resources)
  // eslint-disable-next-line array-callback-return
  const matcaps = folders.map((folder) => {
    let matcap = {}
    const newPath = path.join(resources, folder)
    if (fs.statSync(newPath).isDirectory()) {
      // eslint-disable-next-line array-callback-return
      fs.readdirSync(newPath).map((filename) => {
        const filePath = path.join(resources, folder, filename)
        const fileContents = fs.readFileSync(filePath, 'utf-8')
        if (filename.includes('.json')) {
          matcap.info = JSON.parse(fileContents)
        }

        if (filename.includes('.png')) {
          matcap.preview = `/matcaps/${folder}/${filename}`
        }

        if (filename.includes('.exr') || filename.includes('.jpg')) {
          const { size } = getSize(filePath)
          matcap.size = size
        }
      })
      return matcap
    }

    matcap = null
  })

  return matcaps.filter((a) => a)
}

export const getAllMatcapsLinks = () => {
  const resources = path.join(process.cwd(), 'public/matcaps')
  const folders = fs.readdirSync(resources)
  const models = folders
    .filter((folder) => {
      const newPath = path.join(resources, folder)
      return fs.statSync(newPath).isDirectory()
    })
    .map((a) => `/matcap/${a}`)

  return models
}

export default getAllMatcaps
