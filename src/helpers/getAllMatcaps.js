import path from 'path'
import fs from 'fs'
import { getSize } from './getFileSize'

const getAllMatcaps = () => {
  const resources = path.join(process.cwd(), 'public/materials')
  const folders = fs.readdirSync(resources)
  // eslint-disable-next-line array-callback-return
  const materials = folders.map((folder) => {
    let material = {}
    const newPath = path.join(resources, folder)
    if (fs.statSync(newPath).isDirectory()) {
      // eslint-disable-next-line array-callback-return
      fs.readdirSync(newPath).map((filename) => {
        const filePath = path.join(resources, folder, filename)
        const fileContents = fs.readFileSync(filePath, 'utf-8')
        material.url = folder
        if (filename.includes('.json')) {
          material.info = JSON.parse(fileContents)
        }

        if (filename.includes('.png')) {
          material.preview = `/materials/${folder}/${filename}`
        }

        if (filename.includes('.exr') || filename.includes('.jpg')) {
          const { size } = getSize(filePath)
          material.size = size
        }
      })
      return material
    }

    material = null
  })

  return materials.filter((a) => a)
}

export const getAllMatcapsLinks = () => {
  const resources = path.join(process.cwd(), 'public/materials')
  const folders = fs.readdirSync(resources)
  const models = folders
    .filter((folder) => {
      const newPath = path.join(resources, folder)
      return fs.statSync(newPath).isDirectory()
    })
    .map((a) => `/material/${a}`)

  return models
}

export default getAllMatcaps
