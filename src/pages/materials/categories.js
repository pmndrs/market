import useStore from '@/helpers/store'
import Link from 'next/link'
import Layout from '@/components/layout/'
import { useEffect } from 'react'
import Category from '@/components/Category'

const Categories = ({ title, categories }) => {
  useEffect(() => {
    useStore.setState({ title })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout title='Categories'>
      <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {categories.map((category) => (
          <Category {...category} key={category.name} material />
        ))}
      </ul>
    </Layout>
  )
}

export default Categories

export async function getStaticProps() {
  const data = await fetch('https://api.market.pmnd.rs/materials/categories')
  const categories = await data.json()

  return {
    props: {
      categories,
      title: 'Categories',
    },
  }
}
