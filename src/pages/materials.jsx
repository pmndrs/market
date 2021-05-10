import useStore from '@/helpers/store/materials'
import Layout from '@/components/layout/'
import { useEffect } from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import Material from '@/components/Material'
import { API_ENDPOINT } from '@/helpers/constants/api'

const Index = ({ title, materials }) => {
  const { search, currentMaterials, setSearch } = useStore((state) => ({
    search: state.search,
    currentMaterials: state.currentMaterials,
    setSearch: state.setSearch,
  }))
  useEffect(() => {
    useStore.setState({ currentMaterials: materials })
    useStore.setState({ defaultMaterials: materials })
    useStore.setState({ title })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const heading = search
    ? `Search for ${search}`
    : `All Materials (${currentMaterials.length})`
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
          <Material {...material} key={material.image} />
        ))}
      </ul>
    </Layout>
  )
}
export default Index

export async function getStaticProps() {
  const data = await fetch(`${API_ENDPOINT}/materials`)
  const materials = await data.json()
  return {
    props: {
      materials,
      title: 'Materials',
    },
  }
}
