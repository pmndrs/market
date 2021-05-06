import fs from 'fs'

export const getSize = (filePath, justNumber = false) => {
  var stats = fs.statSync(filePath)
  var fileSizeInBytes = stats.size
  let size

  if (filePath.includes('_textures')) {
    size = fileSizeInBytes / 1000
  } else {
    if (!size) size = fileSizeInBytes / 1000
  }

  if (justNumber) return { size }
  return {
    highPoly: size > 500,
    size:
      size > 1000 ? (size / 1000).toFixed(2) + 'MB' : size.toFixed(2) + 'KB',
  }
}
