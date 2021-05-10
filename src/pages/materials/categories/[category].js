import useStore from '@/helpers/store'
import Layout from '@/components/layout/'
import { useEffect } from 'react'
import Material from '@/components/Material'
import { API_ENDPOINT } from '@/helpers/constants/api'

const Page = ({ title, materials }) => {
  useEffect(() => {
    useStore.setState({ title })
  }, [title])

  return (
    <Layout title={`Models in ${title}`}>
      <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {materials.map((material) => (
          <Material {...material} key={material.info.name} />
        ))}
      </ul>
    </Layout>
  )
}

export default Page

export async function getStaticProps({ params }) {
  const data = await fetch(`${API_ENDPOINT}/materials`)
  const allMaterials = await data.json()
  const materials = allMaterials.filter(
    (material) =>
      material.info.category.toLowerCase() === params.category.toLowerCase()
  )
  const capitalizeFirstLetter = ([first, ...rest]) =>
    first.toUpperCase() + rest.join('')

  return {
    props: {
      materials,
      title: capitalizeFirstLetter(params.category),
    },
  }
}

export async function getStaticPaths() {
  const data = await fetch(`${API_ENDPOINT}/materials/categories`)
  const categories = await data.json()
  const paths = categories
    .map((cat) => cat.name)
    .map((cat) => `/materials/categories/${cat}`)

  return {
    paths,
    fallback: false,
  }
}
