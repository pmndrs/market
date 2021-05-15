import useStore from '@/helpers/store'
import Layout from '@/components/layout/'
import Asset from '@/components/Asset'
import { useEffect } from 'react'
import { API_ENDPOINT } from '@/helpers/constants/api'

const Page = ({ title, assets, type }) => {
  useEffect(() => {
    useStore.setState({ title })
  }, [title])

  return (
    <Layout title={`${type} in ${title}`}>
      <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {assets.map((asset) => (
          <Asset {...asset} key={asset.id} />
        ))}
      </ul>
    </Layout>
  )
}

export default Page

export async function getServerSideProps({ params }) {
  const data = await fetch(`${API_ENDPOINT}/${params.categoryType}`)
  const allModels = await data.json()
  const assets = allModels.filter(
    (asset) => asset.category.toLowerCase() === params.category.toLowerCase()
  )
  const capitalizeFirstLetter = ([first, ...rest]) =>
    first.toUpperCase() + rest.join('')

  return {
    props: {
      type: capitalizeFirstLetter(params.categoryType),
      assets,
      title: capitalizeFirstLetter(params.category),
    },
  }
}
