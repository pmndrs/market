import path from 'path'
import fs from 'fs'

const getModel = (name) => {
  const resources = path.join(process.cwd(), 'public/resources')
  var model = {}
  const newPath = path.join(resources, name)
  if (fs.statSync(newPath).isDirectory()) {
    // eslint-disable-next-line array-callback-return
    fs.readdirSync(newPath).map((filename) => {
      const filePath = path.join(resources, name, filename)
      const fileContents = fs.readFileSync(filePath, 'utf-8')
      var stats = fs.statSync(filePath)
      var fileSizeInBytes = stats.size
      model.size = (fileSizeInBytes / 1024).toFixed(2)
      model.url = name
      if (filename.includes('.png') || filename.includes('.jpg')) {
        model.image = `/resources/${name}/${filename}`
      } else if (filename.includes('.json')) {
        model.info = JSON.parse(fileContents)
      } else {
        if (filename.includes('_textures')) {
          model.gltfTextured = `/resources/${name}/${filename}`
          model.buffer = fileContents
        } else {
          model.gltf = `/resources/${name}/${filename}`
          if (!model.buffer) model.buffer = fileContents
        }
      }
    })
    return model
  }

  return model
}

export default getModel
