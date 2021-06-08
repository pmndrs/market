import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'
import Layout from '@/components/layout/'
import AssetInfo from '../../components/AssetInfo'
import { useEffect } from 'react'
import { API_ENDPOINT } from '@/helpers/constants/api'
import NextAndPrev from '@/components/NextAndPrev'
import Error from '../404'
import Stats from '@/components/info/Stats'
import FavoriteButton from '@/components/FavoriteButton'
import Comments from '@/components/comments'

const Viewer = dynamic(() => import('@/components/canvas/Model'), {
  ssr: false,
})

const Page = ({ title, model, notFound }) => {
  const { user } = useStore()
  useEffect(() => {
    useStore.setState({ title })
  }, [title])
  if (notFound) return <Error />

  return (
    <Layout title={title}>
      <main className='block my-10 sm:grid sm:grid-cols-3 gap-x-4 gap-y-8'>
        <div className='relative min-w-full min-h-full col-span-2'>
          <div className='absolute z-10 right-5 scale-150 top-5 transform'>
            {user && <FavoriteButton asset={model} />}
          </div>
          <Viewer {...model} id={model._id} />
        </div>
        <AssetInfo {...model} />
      </main>
      {model.stats && <Stats stats={model.stats} size={model.size} />}
      <NextAndPrev {...model} />
      <Comments id={model.id} />
    </Layout>
  )
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
