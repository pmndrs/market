import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'
import Layout from '@/components/layout/'
import ModelInfo from '../../components/ModelInfo'
import { useEffect } from 'react'
import { API_ENDPOINT } from '@/helpers/constants/api'
import NextAndPrev from '@/components/NextAndPrev'

const ModelViewer = dynamic(() => import('@/components/canvas/Model'), {
  ssr: false,
})

const HdriViewer = dynamic(() => import('@/components/canvas/HDRI'), {
  ssr: false,
})

const MaterialViewer = dynamic(() => import('@/components/canvas/Material'), {
  ssr: false,
})

const Page = ({ title, asset }) => {
  useEffect(() => {
    useStore.setState({ title })
  }, [title])

  return (
    <Layout title={title}>
      <main className='my-10 grid sm:grid-cols-3 gap-x-4 gap-y-8'>
        <div className='min-w-full min-h-full col-span-2'>
          {/* @TODO This can be better */}
          {asset.type === 'model' ? (
            <ModelViewer buffer={asset.buffer} />
          ) : asset.type === 'hdris' ? (
            <HdriViewer {...asset} />
          ) : (
            <MaterialViewer {...asset} />
          )}
        </div>
        <ModelInfo {...asset} />
      </main>
      <NextAndPrev {...asset} />
    </Layout>
  )
}

export default Page

function fetchJSON(url) {
  return fetch(`${API_ENDPOINT}/${url}`)
    .then((data) => data.json())
    .catch((err) => {
      console.log(err)
    })
}

export async function getServerSideProps({ params }) {
  console.log('static props', params)

  const buffer = await fetch(
    `${API_ENDPOINT}/${params.itemType}/${params.name}/buffer`
  ).then((data) => data.text())

  const asset = await fetchJSON(`/${params.itemType}/${params.name}`)

  const creator =
    typeof asset.creator === 'string'
      ? await fetchJSON(`/creators/${asset.creator}`)
      : asset.creator

  const team =
    typeof asset.team === 'string'
      ? await fetchJSON(`/teams/${asset.team}`)
      : asset.team || null

  return {
    props: {
      asset: {
        ...asset,
        type: params.itemType,
        buffer,
        creator,
        team,
      },
      title: asset.name,
    },
  }
}
