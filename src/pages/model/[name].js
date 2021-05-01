import useStore from '@/helpers/store'
import { getAllModelLinks } from '@/helpers/getAllModels'
import getModel from '@/helpers/getModel'
import dynamic from 'next/dynamic'
import Layout from '@/components/layout/'

const ModelC = dynamic(() => import('@/components/canvas/Model'), {
  ssr: false,
})

const Page = ({ title, model }) => {
  useStore.setState({ title })
  return (
    <Layout title={title}>
      <main className='min-h-screen mt-10 grid sm:grid-cols-2 gap-x-4 gap-y-8'>
        <div className='mt-5'>
          <div className='block mb-5 overflow-hidden bg-gray-100 rounded group w-80'>
            <img
              src={model.image}
              alt={model.info.name}
              className='object-cover pointer-events-none'
            />
          </div>
          <aside className='relative'>
            <span className='text-gray-600'>Created by: </span>
            <a
              target='_blank'
              href={model.info.creatorLink}
              rel='noreferrer'
              className='font-bold'
            >
              {model.info.creator}
            </a>
            <span className='block'>
              <span className='text-gray-600'>License: </span>{' '}
              <span className='font-bold'>{model.info.license}</span>
            </span>
            <span className='block'>
              <span className='text-gray-600'>Size: </span>{' '}
              <span className='font-bold'>{model.size}KB</span>
            </span>
            {model.info.categories && (
              <>
                <span className='text-gray-600'>Categories: </span>
                {model.info.categories.map((category) => (
                  <span
                    key={category}
                    className='inline-flex items-center px-2 text-xs font-medium text-gray-800 bg-gray-100 rounded py-0.5'
                  >
                    {category}
                  </span>
                ))}
              </>
            )}
            <div className='mt-7'>
              <button className='block w-full py-2 text-center text-white bg-gray-800'>
                Copy JSX Code
              </button>
              {console.log(model.gltfTextured)}
              {model.gltfTextured && (
                <a
                  href={model.gltfTextured}
                  download
                  className='block w-full py-2 mt-4 text-center text-white bg-indigo-600'
                >
                  Download Textured GLTF
                </a>
              )}
              <a
                href={model.gltf}
                download
                className='block w-full py-2 mt-4 text-center text-white bg-indigo-600'
              >
                Download GLTF
              </a>
            </div>
          </aside>
        </div>
        <div className='w-full h-full'>
          <ModelC buffer={model.buffer} />
        </div>
      </main>
    </Layout>
  )
}

export default Page

export async function getStaticProps({ params }) {
  const model = getModel(params.name)

  return {
    props: {
      model,
      title: model.info.name,
    },
  }
}

export async function getStaticPaths() {
  const models = getAllModelLinks()
  return {
    paths: models,
    fallback: false,
  }
}
