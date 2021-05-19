import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'
import Layout from '@/components/layout/'
import ModelInfo from '../../components/ModelInfo'
import { useEffect } from 'react'
import { API_ENDPOINT } from '@/helpers/constants/api'
import NextAndPrev from '@/components/NextAndPrev'
import Error from '../404'

const Viewer = dynamic(() => import('@/components/canvas/Model'), {
  ssr: false,
})

const Page = ({ title, model, notFound }) => {
  useEffect(() => {
    useStore.setState({ title })
  }, [title])
  if (notFound) return <Error />
  return (
    <Layout title={title}>
      <main className='block my-10 sm:grid sm:grid-cols-3 gap-x-4 gap-y-8'>
        <div className='min-w-full min-h-full col-span-2'>
          <Viewer {...model} />
        </div>
        <ModelInfo {...model} />
      </main>
      <NextAndPrev {...model} />
    </Layout>
  )
}

export default Page

export async function getServerSideProps({ params }) {
  try {
    const model = await fetch(
      `${API_ENDPOINT}/models/${params.name}`
    ).then((rsp) => rsp.json())

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
