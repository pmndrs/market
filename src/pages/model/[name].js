import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'
import Layout from '@/components/layout/'
import ModelInfo from '../../components/ModelInfo'
import { useEffect } from 'react'
import { Leva } from 'leva'

const Viewer = dynamic(() => import('@/components/canvas/Model'), {
  ssr: false,
})

const Page = ({ title, model }) => {
  useEffect(() => {
    useStore.setState({ title })
  }, [title])

  return (
    <Layout title={title}>
      <main className='my-10 grid sm:grid-cols-3 gap-x-4 gap-y-8'>
        <ModelInfo {...model} />
        <div className='min-w-full min-h-full col-span-2'>
          <div
            className='absolute z-10 hidden right-[-60px] sm:block top-[-10px]'
            style={{ transform: 'translateX(50%)' }}
          >
            <Leva fill />
          </div>
          <Viewer buffer={model.buffer} />
        </div>
      </main>
    </Layout>
  )
}

export default Page

export async function getStaticProps({ params }) {
  const data = await fetch(
    'https://api.market.pmnd.rs/models/model?name=' + params.name
  )
  const model = await data.json()
  return {
    props: {
      model,
      title: model.info.name,
    },
  }
}

export async function getStaticPaths() {
  const data = await fetch('https://api.market.pmnd.rs/models/paths')
  const paths = await data.json()
  return {
    paths,
    fallback: false,
  }
}
