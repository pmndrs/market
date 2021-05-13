import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'
import Layout from '@/components/layout/'
import ModelInfo from '../../components/ModelInfo'
import { useEffect } from 'react'
import { Leva } from 'leva'
import { API_ENDPOINT } from '@/helpers/constants/api'
import NextAndPrev from '@/components/NextAndPrev'

const Viewer = dynamic(() => import('@/components/canvas/Model'), {
  ssr: false,
})

const Page = ({ title, model, creator, team }) => {
  useEffect(() => {
    useStore.setState({ title })
  }, [title])

  return (
    <Layout title={title}>
      <main className='my-10 grid sm:grid-cols-3 gap-x-4 gap-y-8'>
        <div className='min-w-full min-h-full col-span-2'>
          <Viewer buffer={model.buffer} />
        </div>
        <ModelInfo model={model} creator={creator} team={team} />
      </main>
      <NextAndPrev {...model} />
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

export async function getStaticProps({ params }) {
  const buffer = await fetch(
    `${API_ENDPOINT}/models/${params.name}/buffer`
  ).then((data) => data.text())

  const model = await fetchJSON(`/models/${params.name}`)

  const creator =
    typeof model.creator === 'string'
      ? await fetchJSON(`/creators/${model.creator}`)
      : model.creator
      
  const team =
    typeof model.team === 'string'
      ? await fetchJSON(`/teams/${model.team}`)
      : (model.team || null)

  return {
    props: {
      model: {
        ...model,
        buffer,
      },
      creator,
      team,
      title: model.name,
    },
  }
}

export async function getStaticPaths() {
  const data = await fetch(`${API_ENDPOINT}/models/paths`)
  const paths = await data.json()
  return {
    paths,
    fallback: false,
  }
}
