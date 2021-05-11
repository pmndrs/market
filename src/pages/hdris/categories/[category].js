import useStore from '@/helpers/store'
import Layout from '@/components/layout/'
import { useEffect } from 'react'
import { API_ENDPOINT } from '@/helpers/constants/api'
import Asset from '@/components/Asset'

const Page = ({ title, hdris }) => {
  useEffect(() => {
    useStore.setState({ title })
  }, [title])

  return (
    <Layout title={`Hdris in ${title}`}>
      <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {hdris.map((hdri) => (
          <Asset {...hdri} key={hdri.id} />
        ))}
      </ul>
    </Layout>
  )
}

export default Page

export async function getStaticProps({ params }) {
  const data = await fetch(`${API_ENDPOINT}/hdri`)
  const allHdris = await data.json()
  const hdris = allHdris.filter(
    (hdri) => hdri.category.toLowerCase() === params.category.toLowerCase()
  )
  const capitalizeFirstLetter = ([first, ...rest]) =>
    first.toUpperCase() + rest.join('')

  return {
    props: {
      hdris,
      title: capitalizeFirstLetter(params.category),
    },
  }
}

export async function getStaticPaths() {
  const data = await fetch(`${API_ENDPOINT}/hdri/categories`)
  const categories = await data.json()
  const paths = categories
    .map((cat) => cat.name)
    .map((cat) => `/hdris/categories/${cat}`)

  return {
    paths,
    fallback: false,
  }
}
