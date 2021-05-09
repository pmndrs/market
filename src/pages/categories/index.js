import useStore from '@/helpers/store'
import Link from 'next/link'
import Layout from '@/components/layout/'
import { useEffect } from 'react'

const Categories = ({ title, categories }) => {
  useEffect(() => {
    useStore.setState({ title })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const randomModel = (items) => items[Math.floor(Math.random() * items.length)]
  return (
    <Layout title='Categories'>
      <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {categories.map((category) => (
          <li key={category.name} className='relative'>
            <Link
              className='absolute inset-0 focus:outline-none'
              href={`/categories/${category.name}`}
            >
              <a>
                <div className='block w-full overflow-hidden bg-gray-100 rounded-lg group aspect-w-10 aspect-h-7 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500'>
                  <img
                    src={`https://api.market.pmnd.rs${
                      randomModel(category.models).image
                    }`}
                    alt={category.name}
                    className='object-cover pointer-events-none group-hover:opacity-75'
                  />
                  <p className='absolute flex items-center justify-center font-bold text-gray-900 uppercase truncate bg-white pointer-events-none bg-opacity-40'>
                    <span>{category.name}</span>
                  </p>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default Categories

export async function getStaticProps() {
  const data = await fetch('https://api.market.pmnd.rs/models/categories')
  const categories = await data.json()

  return {
    props: {
      categories,
      title: 'Categories',
    },
  }
}
