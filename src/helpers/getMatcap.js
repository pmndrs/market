import path from 'path'
import fs from 'fs'

const getMaterial = (name) => {
  const resources = path.join(process.cwd(), 'public/materials')
  var material = {}
  const newPath = path.join(resources, name)
  if (fs.statSync(newPath).isDirectory()) {
    // eslint-disable-next-line array-callback-return
    fs.readdirSync(newPath).map((filename) => {
      const filePath = path.join(resources, name, filename)
      const fileContents = fs.readFileSync(filePath, 'utf-8')
      material = JSON.parse(fileContents)
    })
    return material
  }

  return material
}

export default getMaterial
