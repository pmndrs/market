import useStore from '@/helpers/store'
import getAllModelsInCategory from '@/helpers/getAllModelsInCategory'
import Layout from '@/components/layout/'
import Model from '@/components/Model'
import { useEffect } from 'react'
import getAllCategories from '@/helpers/getAllCategories'

const Page = ({ title, models }) => {
  useEffect(() => {
    useStore.setState({ title })
  }, [title])

  return (
    <Layout title={`Models in ${title}`}>
      <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {models.map((model) => (
          <Model {...model} key={model.gltf} />
        ))}
      </ul>
    </Layout>
  )
}

export default Page

export async function getStaticProps({ params }) {
  const models = getAllModelsInCategory(params.category)
  const capitalizeFirstLetter = ([first, ...rest]) =>
    first.toUpperCase() + rest.join('')

  return {
    props: {
      models,
      title: capitalizeFirstLetter(params.category),
    },
  }
}

export async function getStaticPaths() {
  const categiories = getAllCategories()
    .map((cat) => cat.name)
    .map((cat) => `/categories/${cat}`)

  return {
    paths: categiories,
    fallback: false,
  }
}
