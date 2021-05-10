import useStore from '@/helpers/store'
import Model from '@/components/Model'
import Layout from '@/components/layout/'
import { SearchIcon } from '@heroicons/react/solid'
import { useEffect } from 'react'
import { API_ENDPOINT } from '@/helpers/constants/api'

const Index = ({ title, models }) => {
  const { search, user, currentModels, setSearch } = useStore((state) => ({
    search: state.search,
    currentModels: state.currentModels,
    setSearch: state.setSearch,
    user: state.user,
  }))
  useEffect(() => {
    useStore.setState({ currentModels: models })
    useStore.setState({ defaultModels: models })
    useStore.setState({ title })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(user)
  const heading = search
    ? `Search for ${search}`
    : `All Models (${currentModels.length})`
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
        {currentModels.map((model, i) => (
          <Model {...model} key={i} />
        ))}
      </ul>
    </Layout>
  )
}

export default Index

export async function getStaticProps() {
  const data = await fetch(`${API_ENDPOINT}/models`)
  const models = await data.json()

  return {
    props: {
      models,
      title: 'Models',
    },
  }
}
