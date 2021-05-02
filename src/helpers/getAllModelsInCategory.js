import getAllModels from './getAllModels'

const getAllModelsInCategory = (cat) => {
  const models = getAllModels()
  return models.filter(
    (model) => model.info.category.toLowerCase() === cat.toLowerCase()
  )
}

export default getAllModelsInCategory
