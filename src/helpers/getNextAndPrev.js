import fs from 'fs'
import path from 'path'

const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

export const getNextAndPrev = (folder, name) => {
  const allDirs = getDirectories(folder)
  const currentIndex = allDirs.findIndex((n) => n === name)
  const [nextDir, prevDir] = [
    allDirs[currentIndex + 1],
    allDirs[currentIndex - 1],
  ]
  let data = {}
  if (currentIndex < allDirs.length - 1) {
    const nextInfoPath = path.join(folder, nextDir, 'info.json')
    data.next = {
      url: nextDir,
      ...JSON.parse(fs.readFileSync(nextInfoPath, 'utf-8')),
    }
  }
  if (currentIndex > 0) {
    const prevInfoPath = path.join(folder, prevDir, 'info.json')
    data.prev = {
      url: prevDir,
      ...JSON.parse(fs.readFileSync(prevInfoPath, 'utf-8')),
    }
  }

  return data
}
