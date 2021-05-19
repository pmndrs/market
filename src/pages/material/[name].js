import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'
import Layout from '@/components/layout/'
import MaterialInfo from '../../components/MaterialInfo'
import { useEffect } from 'react'
import { API_ENDPOINT } from '@/helpers/constants/api'
import NextAndPrev from '@/components/NextAndPrev'
import Error from '../404'

const Viewer = dynamic(() => import('@/components/canvas/Material'), {
  ssr: false,
})

const Page = ({ title, material, notFound }) => {
  useEffect(() => {
    useStore.setState({ title })
  }, [title])
  if (notFound) return <Error />
  return (
    <Layout title={title}>
      <main className='block my-10 sm:grid sm:grid-cols-3 gap-x-4 gap-y-8'>
        <div className='min-w-full min-h-full col-span-2'>
          <Viewer {...material} />
        </div>
        <MaterialInfo {...material} />
      </main>
      <NextAndPrev {...material} />
    </Layout>
  )
}

export default Page

export async function getServerSideProps({ params }) {
  try {
    const data = await fetch(`${API_ENDPOINT}/materials/${params.name}`)
    const material = await data.json()
    return {
      props: {
        material,
        title: material.name,
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
