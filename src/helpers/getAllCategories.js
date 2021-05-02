import getAllModels from './getAllModels'

const getAllCategories = () => {
  const models = getAllModels()
  const categories = models.reduce((acc, curr) => {
    const cat = curr.info.category
    if (acc[cat]) {
      acc[cat].models.concat(acc)
    } else {
      acc[cat] = {
        name: cat,
        models: [curr],
      }
    }
    return acc
  }, {})

  return Object.values(categories)
}

export default getAllCategories
