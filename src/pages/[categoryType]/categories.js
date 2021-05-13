import useStore from '@/helpers/store'
import Layout from '@/components/layout/'
import { useEffect } from 'react'
import Category from '@/components/Category'
import { API_ENDPOINT, endpointPaths } from '@/helpers/constants/api'
import { useRouter } from 'next/router'

const Categories = ({ title, categories }) => {
  const { query } = useRouter()

  useEffect(() => {
    useStore.setState({ title })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Layout title='Categories'>
      <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {categories.map((category) => (
          <Category
            {...category}
            key={category.name}
            type={query.categoryType}
          />
        ))}
      </ul>
    </Layout>
  )
}

export default Categories

export async function getStaticProps(ctx) {
  const type = ctx.params.categoryType

  const data = await fetch(`${API_ENDPOINT}/${endpointPaths[type]}/categories`)
  const categories = await data.json()

  return {
    props: {
      categories,
      title: 'Categories',
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      '/models/categories/',
      '/materials/categories/',
      '/hdris/categories/',
    ],
    fallback: false,
  }
}
