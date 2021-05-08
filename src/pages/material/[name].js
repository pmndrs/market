import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'
import Layout from '@/components/layout/'
import MaterialInfo from '../../components/MaterialInfo'
import { useEffect } from 'react'
import { Leva } from 'leva'
import { getAllMaterialLinks } from '@/helpers/getAllMaterials'
import getMaterial from '@/helpers/getMaterial'

const Viewer = dynamic(() => import('@/components/canvas/Material'), {
  ssr: false,
})

const Page = ({ title, material }) => {
  useEffect(() => {
    useStore.setState({ title })
  }, [title])
  console.log(material)
  return (
    <Layout title={title}>
      <main className='my-10 grid sm:grid-cols-3 gap-x-4 gap-y-8'>
        <MaterialInfo {...material} />
        <div className='min-w-full min-h-full col-span-2'>
          <div
            className='absolute z-10 hidden right-[-60px] sm:block top-[-10px]'
            style={{ transform: 'translateX(50%)' }}
          >
            <Leva fill />
          </div>
          <Viewer {...material} />
        </div>
      </main>
    </Layout>
  )
}

export default Page

export async function getStaticProps({ params }) {
  const material = getMaterial(params.name)
  return {
    props: {
      material,
      title: material.info.name,
    },
  }
}

export async function getStaticPaths() {
  const materials = getAllMaterialLinks()
  return {
    paths: materials,
    fallback: false,
  }
}
