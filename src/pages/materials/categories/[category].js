import useStore from '@/helpers/store'
import Layout from '@/components/layout/'
import { useEffect } from 'react'
import Link from 'next/link'
import { getMaterialSize } from '@/helpers/getMaterialSize'

const Page = ({ title, materials }) => {
  useEffect(() => {
    useStore.setState({ title })
  }, [title])

  return (
    <Layout title={`Models in ${title}`}>
      <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {materials.map((material) => (
          <li key={material.image} className='relative'>
            <Link
              className='absolute inset-0 focus:outline-none'
              href={`/material/${material.url}`}
            >
              <a>
                <div className='relative'>
                  <span className='absolute right-0 z-10 p-2 text-sm text-gray-800 bg-gray-100 rounded-tl-none rounded-tr-lg rounded-br-none rounded-bl-md opacity-85'>
                    {material.info.category}
                  </span>{' '}
                  <div className='block w-full overflow-hidden bg-gray-100 rounded-lg group aspect-w-10 aspect-h-7 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500'>
                    <img
                      src={'https://api.market.pmnd.rs/' + material.preview}
                      alt=''
                      className='object-cover pointer-events-none group-hover:opacity-75'
                    />
                  </div>
                </div>
                <p className='block mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none'>
                  {material.info?.name}
                </p>
                <p className='flex block text-sm font-medium text-gray-500'>
                  {getMaterialSize(material)}
                </p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default Page

export async function getStaticProps({ params }) {
  const data = await fetch('https://api.market.pmnd.rs/materials')
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
  const data = await fetch('https://api.market.pmnd.rs/materials/categories')
  const categories = await data.json()
  const paths = categories
    .map((cat) => cat.name)
    .map((cat) => `/materials/categories/${cat}`)

  return {
    paths,
    fallback: false,
  }
}
