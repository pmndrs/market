import useStore from '@/helpers/store/hdri'
import Layout from '@/components/layout/'
import { useEffect } from 'react'
import { API_ENDPOINT } from '@/helpers/constants/api'
import Asset from '@/components/Asset'
import Search from '@/components/Search'

const Index = ({ title, hdris }) => {
  const { search, currentHdri, setSearch, setOrder } = useStore((state) => ({
    search: state.search,
    currentHdri: state.currentHdri,
    setSearch: state.setSearch,
    setOrder: state.setOrder,
  }))
  useEffect(() => {
    useStore.setState({ currentHdri: hdris })
    useStore.setState({ defaultHdri: hdris })
    useStore.setState({ title })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const heading = search
    ? `Search for ${search}`
    : `All HDRIs (${currentHdri.length})`
  return (
    <Layout title={heading}>
      <Search
        search={search}
        setSearch={setSearch}
        onOrderChange={setOrder}
        assetName="HDRI's"
      />
      <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {currentHdri.map((hdri, i) => (
          <Asset {...hdri} key={i} />
        ))}
      </ul>
    </Layout>
  )
}

export default Index

export async function getServerSideProps() {
  const data = await fetch(`${API_ENDPOINT}/hdris`)
  const hdris = await data.json()

  return {
    props: {
      hdris,
      title: 'HDRIs',
    },
  }
}
