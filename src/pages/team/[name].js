import useStore from '@/helpers/store'
import { useEffect } from 'react'
import { API_ENDPOINT } from '@/helpers/constants/api'
import Error from '../404'
import CreatorPage from '@/components/CreatorPage'

const Page = ({ title, team, notFound }) => {
  useEffect(() => {
    useStore.setState({ title })
  }, [title])
  if (notFound) return <Error />
  return <CreatorPage title={title} creator={team} />
}

export default Page

export async function getServerSideProps({ params }) {
  try {
    const data = await fetch(`${API_ENDPOINT}/teams/${params.name}/assets`)
    const team = await data.json()
    return {
      props: {
        team,
        title: team.name,
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
