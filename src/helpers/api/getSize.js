export const getSize = (starterSize, filename, justNumber = false) => {
  let size
  if (filename.includes('_textures')) {
    size = starterSize / 1000
  } else {
    if (!size) size = starterSize / 1000
  }

  if (justNumber) return { size }
  return {
    highPoly: size > 500,
    size:
      size > 1000 ? (size / 1000).toFixed(2) + 'MB' : size.toFixed(2) + 'KB',
  }
}
