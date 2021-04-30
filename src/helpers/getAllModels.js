import path from 'path'
import fs from 'fs'

const getAllModels = () => {
  const a = path.join(process.cwd(), 'public/resources')
  const folders = fs.readdirSync(a)
  // eslint-disable-next-line array-callback-return
  const models = folders.map((folder) => {
    let model = {}
    const newPath = path.join(a, folder)
    if (fs.statSync(newPath).isDirectory()) {
      // eslint-disable-next-line array-callback-return
      fs.readdirSync(newPath).map((filename) => {
        const filePath = path.join(a, folder, filename)
        const fileContents = fs.readFileSync(filePath, 'utf-8')
        var stats = fs.statSync(filePath)
        var fileSizeInBytes = stats.size
        model.size = (fileSizeInBytes / 1024).toFixed(2)
        model.url = folder
        if (filename.includes('.png') || filename.includes('.jpg')) {
          model.image = `/resources/${folder}/${filename}`
        } else if (filename.includes('.json')) {
          model.info = JSON.parse(fileContents)
        } else {
          model.gltf = `resources/${folder}/${filename}`
          model.buffer = fileContents
        }
      })
      return model
    }
  })

  return models
}

export default getAllModels
