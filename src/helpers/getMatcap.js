import path from 'path'
import fs from 'fs'

const getMatcap = (name) => {
  const resources = path.join(process.cwd(), 'public/matcaps')
  var matcap = {}
  const newPath = path.join(resources, name)
  if (fs.statSync(newPath).isDirectory()) {
    // eslint-disable-next-line array-callback-return
    fs.readdirSync(newPath).map((filename) => {
      const filePath = path.join(resources, name, filename)
      const fileContents = fs.readFileSync(filePath, 'utf-8')
      matcap = JSON.parse(fileContents)
    })
    return matcap
  }

  return matcap
}

export default getMatcap
