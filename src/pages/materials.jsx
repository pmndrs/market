import useStore from '@/helpers/store/materials'
import Layout from '@/components/layout/'
import { useEffect } from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import getAllMatcaps from '@/helpers/getAllMatcaps'
import Link from 'next/link'
import { shuffle } from '../helpers/shuffle'

const Index = ({ title, materials }) => {
  const { search, currentMaterials, setSearch } = useStore((state) => ({
    search: state.search,
    currentMaterials: state.currentMaterials,
    setSearch: state.setSearch,
  }))
  useEffect(() => {
    useStore.setState({ currentMaterials: shuffle(materials) })
    useStore.setState({ defaultMaterials: materials })
    useStore.setState({ title })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const heading = search
    ? `Search for ${search}`
    : `All Models (${currentMaterials.length})`
  return (
    <Layout title={heading}>
      <div>
        <label htmlFor='search' className='sr-only'>
          Search for modules
        </label>
        <div className='relative mt-6 rounded-md shadow-sm'>
          <input
            type='search'
            name='search'
            id='search'
            value={search}
            onChange={setSearch}
            className='block w-full pr-10 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
            placeholder='Search for models'
          />
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
            <SearchIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
          </div>
        </div>
      </div>
      <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {currentMaterials.map((material) => (
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
                      src={material.preview}
                      alt=''
                      className='object-cover pointer-events-none group-hover:opacity-75'
                    />
                  </div>
                </div>
                <p className='block mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none'>
                  {material.info?.name}
                </p>
                <p className='flex block text-sm font-medium text-gray-500'>
                  {material.size}
                </p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
export default Index

export async function getStaticProps() {
  const materials = getAllMatcaps()

  return {
    props: {
      materials,
      title: 'Materials',
    },
  }
}
