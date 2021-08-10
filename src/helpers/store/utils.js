export const sortAssets = (orderBy, currentAssets, orderDirection) => {
  let assetsToReturn
  switch (orderBy) {
    case 'views':
      assetsToReturn = currentAssets.sort((a, b) => b.views - a.views)
      break
    case 'added':
      assetsToReturn = currentAssets.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
      break
    case 'size':
      assetsToReturn = currentAssets.sort(
        (a, b) => a.originalSize - b.originalSize
      )
      break
    default:
      assetsToReturn = currentAssets.sort((a, b) => (a.id < b.id ? -1 : 1))
    // default is alphabetic
  }

  return orderDirection === 'asc' ? assetsToReturn : assetsToReturn.reverse()
}
