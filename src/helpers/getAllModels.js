import path from 'path'
import fs from 'fs'
import { getSize } from './getFileSize'

const getAllModels = () => {
  const resources = path.join(process.cwd(), 'public/resources')
  const folders = fs.readdirSync(resources)
  // eslint-disable-next-line array-callback-return
  const models = folders.map((folder) => {
    let model = {}
    const newPath = path.join(resources, folder)
    if (fs.statSync(newPath).isDirectory()) {
      // eslint-disable-next-line array-callback-return
      fs.readdirSync(newPath).map((filename) => {
        const filePath = path.join(resources, folder, filename)
        const fileContents = fs.readFileSync(filePath, 'utf-8')
        if (filename.includes('.gltf')) {
          const { size, highPoly } = getSize(filePath)
          model.size = size
          model.highPoly = highPoly
        }
        model.url = folder
        if (filename.includes('.png') || filename.includes('.jpg')) {
          model.image = `/resources/${folder}/${filename}`
        } else if (filename.includes('.json')) {
          model.info = JSON.parse(fileContents)
        }
      })
      return model
    }

    model = null
  })

  return models.filter((a) => a)
}

export const getAllModelLinks = () => {
  const resources = path.join(process.cwd(), 'public/resources')
  const folders = fs.readdirSync(resources)
  const models = folders
    .filter((folder) => {
      const newPath = path.join(resources, folder)
      return fs.statSync(newPath).isDirectory()
    })
    .map((a) => `/model/${a}`)

  return models
}

export default getAllModels
