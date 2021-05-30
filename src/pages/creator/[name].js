import useStore from '@/helpers/store'
import { useEffect } from 'react'
import { API_ENDPOINT } from '@/helpers/constants/api'
import Error from '../404'
import CreatorPage from '@/components/CreatorPage'

const Page = ({ title, creator, notFound }) => {
  useEffect(() => {
    useStore.setState({ title })
  }, [title])
  if (notFound) return <Error />
  return <CreatorPage title={title} creator={creator} />
}

export default Page

export async function getServerSideProps({ params }) {
  try {
    const data = await fetch(`${API_ENDPOINT}/creators/${params.name}/assets`)
    const creator = await data.json()
    return {
      props: {
        creator,
        title: creator.name,
      },
    }
  } catch {
    return {
      props: {
        notFound: true,
      },
    }
  }
}
