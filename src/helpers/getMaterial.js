import path from 'path'
import fs from 'fs'
import { getSize } from './getFileSize'

const getMaterial = (name) => {
  const resources = path.join(process.cwd(), 'public/materials')
  var material = {}
  const newPath = path.join(resources, name)
  if (fs.statSync(newPath).isDirectory()) {
    // eslint-disable-next-line array-callback-return
    fs.readdirSync(newPath).map((filename) => {
      const filePath = path.join(resources, name, filename)
      const fileContents = fs.readFileSync(filePath, 'utf-8')

      if (filename.includes('.json')) {
        material = JSON.parse(fileContents)
      }

      if (filename.includes('render.png')) {
        material.image = `/materials/${name}/${filename}`
      }

      if (filename.includes('.jpg') || filename.includes('.exr')) {
        const { size } = getSize(filePath)
        material.size = size
        material.url = `/materials/${name}/${filename}`
      }
    })
    return material
  }

  return material
}

export default getMaterial
