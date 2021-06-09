import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { API_ENDPOINT } from '@/helpers/constants/api'
import Error from '../404'

const Viewer = dynamic(() => import('@/components/canvas/Editor'), {
  ssr: false,
})

const Page = ({ title, model, notFound }) => {
  useEffect(() => {
    useStore.setState({ title })
  }, [title])
  if (notFound) return <Error />

  return <Viewer {...model} />
}

export default Page

export async function getServerSideProps({ params }) {
  try {
    const model = await fetch(`${API_ENDPOINT}/models/${params.name}`).then(
      (rsp) => rsp.json()
    )

    return {
      props: {
        model,
        title: model.name,
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
