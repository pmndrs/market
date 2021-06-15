import useStore from '@/helpers/store'
import Asset from '@/components/Asset'
import Layout from '@/components/layout/'
import { useEffect } from 'react'
import { API_ENDPOINT } from '@/helpers/constants/api'
import Search from '@/components/Search'

const Index = ({ title, models }) => {
  const { search, currentModels, setSearch, setOrder } = useStore((state) => ({
    search: state.search,
    currentModels: state.currentModels,
    setSearch: state.setSearch,
    setOrder: state.setOrder,
  }))
  useEffect(() => {
    useStore.setState({ currentModels: models })
    useStore.setState({ defaultModels: models })
    useStore.setState({ title })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const heading = search
    ? `Search for ${search}`
    : `All Models (${currentModels.length})`
  return (
    <Layout title={heading}>
      <Search
        search={search}
        setSearch={setSearch}
        onOrderChange={setOrder}
        assetName='models'
      />
      <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {currentModels.map((model, i) => (
          <Asset {...model} key={i} />
        ))}
      </ul>
    </Layout>
  )
}

export default Index

export async function getServerSideProps() {
  const data = await fetch(`${API_ENDPOINT}/models`)
  const models = await data.json()

  return {
    props: {
      models,
      title: 'Models',
    },
  }
}
