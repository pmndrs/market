import useMaterialsStore from '@/helpers/store/materials'
import useStore from '@/helpers/store'
import Layout from '@/components/layout/'
import { useEffect } from 'react'
import Asset from '@/components/Asset'
import { API_ENDPOINT } from '@/helpers/constants/api'
import Search from '@/components/Search'

const Index = ({ title, materials }) => {
  const {
    search,
    currentMaterials,
    setSearch,
    setOrderBy,
    setOrderDirection,
    orderDirection,
  } = useMaterialsStore((state) => ({
    search: state.search,
    currentMaterials: state.currentMaterials,
    setSearch: state.setSearch,
    setOrderBy: state.setOrderBy,
    setOrderDirection: state.setOrderDirection,
    orderDirection: state.orderDirection,
  }))
  useEffect(() => {
    useMaterialsStore.setState({ currentMaterials: materials })
    useMaterialsStore.setState({ defaultMaterials: materials })
    useStore.setState({ title })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const heading = search
    ? `Search for ${search}`
    : `All Materials (${currentMaterials.length})`
  return (
    <Layout title={heading}>
      <Search
        search={search}
        setSearch={setSearch}
        onOrderChange={setOrderBy}
        onOrderDirectionChange={setOrderDirection}
        orderDirection={orderDirection}
        assetName='materials'
      />
      <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {currentMaterials.map((material) => (
          <Asset {...material} key={material.id} />
        ))}
      </ul>
    </Layout>
  )
}
export default Index

export async function getServerSideProps() {
  const data = await fetch(`${API_ENDPOINT}/materials`)
  const materials = await data.json()
  return {
    props: {
      materials,
      title: 'Materials',
    },
  }
}
