import useStore from '@/helpers/store'
import Layout from '@/components/layout/'
import { useEffect } from 'react'
import Category from '@/components/Category'
import { API_ENDPOINT } from '@/helpers/constants/api'
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
          <Category {...category} key={category.name} type={query.name} />
        ))}
      </ul>
    </Layout>
  )
}

export default Categories

export async function getServerSideProps(ctx) {
  const type = ctx.params.name

  const data = await fetch(`${API_ENDPOINT}/${type}/categories`)
  const categories = await data.json()
  return {
    props: {
      categories,
      title: 'Categories',
    },
  }
}
