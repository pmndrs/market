import useStore from '@/helpers/store'
import Layout from '@/components/layout/'
import Model from '@/components/Model'
import { useEffect } from 'react'

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
  const data = await fetch('https://api.market.pmnd.rs/models')
  const allModels = await data.json()
  const models = allModels.filter(
    (model) =>
      model.info.category.toLowerCase() === params.category.toLowerCase()
  )
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
  const data = await fetch('https://api.market.pmnd.rs/models/categories')
  const categories = await data.json()
  const paths = categories
    .map((cat) => cat.name)
    .map((cat) => `/models/categories/${cat}`)

  return {
    paths,
    fallback: false,
  }
}
