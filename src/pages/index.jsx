import useStore from '@/helpers/store'
import getAllModels from '@/helpers/getAllModels'
import Model from '@/components/Model'
import Layout from '@/components/layout/'
import { SearchIcon } from '@heroicons/react/solid'
import { useState } from 'react'

const Page = ({ title, models }) => {
  useStore.setState({ title })
  const [currentModels, setCurrentModels] = useState(models)
  const [search, setSearch] = useState('')
  return (
    <Layout>
      <div>
        <label htmlFor='search' className='sr-only'>
          Search for modules
        </label>
        <div className='relative mt-1 rounded-md shadow-sm mt-6'>
          <input
            type='search'
            name='search'
            id='search'
            className='block w-full pr-10 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
            placeholder='Search for models'
          />
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
            <SearchIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
          </div>
        </div>
      </div>
      <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {currentModels.map((model) => (
          <Model {...model} key={model.gltf} />
        ))}
      </ul>
    </Layout>
  )
}

export default Page
// This function gets called at build time on server-side.
// It won't be called on client-side.
export async function getStaticProps() {
  const models = getAllModels()

  return {
    props: {
      models,
      title: 'Models',
    },
  }
}
