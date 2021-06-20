export const sortAssets = (order, currentAssets) => {
  let assetsToReturn
  if (order === 'views') {
    assetsToReturn = currentAssets.sort((a, b) => b.views - a.views)
  }
  if (order === 'added') {
    assetsToReturn = currentAssets.sort(
      (a, b) => new Date(b.lastModified) - new Date(a.lastModified)
    )
  }
  if (order === 'size') {
    assetsToReturn = currentAssets.sort(
      (a, b) => a.originalSize - b.originalSize
    )
  }
  if (order === 'alphabetic') {
    assetsToReturn = currentAssets.sort((a, b) => {
      if (a.id < b.id) {
        return -1
      }
      if (a.id > b.id) {
        return 1
      }
      return 0
    })
  }

  return assetsToReturn
}
