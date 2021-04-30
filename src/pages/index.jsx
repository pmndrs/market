import React, { useState } from 'react'
import useStore from '@/helpers/store'
import getAllModels from '@/helpers/getAllModels'
import dynamic from 'next/dynamic'
import Layout from '@/components/layout/'

const ModelC = dynamic(() => import('@/components/canvas/Model'), {
  ssr: false,
})

const Model = (model) => {
  const [open, setOpen] = useState(false)

  return (
    <li key={model.image} className='relative'>
      <div className='block w-full overflow-hidden bg-gray-100 rounded-lg group aspect-w-10 aspect-h-7 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500'>
        <img
          src={model.image}
          alt=''
          className='object-cover pointer-events-none group-hover:opacity-75'
        />
        <button
          type='button'
          className='absolute inset-0 focus:outline-none'
          onClick={() => setOpen(!open)}
        >
          <span className='sr-only'>View details for {model.info.name}</span>
        </button>
      </div>
      <p className='block mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none'>
        {model.info.name}
      </p>
      <p className='block text-sm font-medium text-gray-500 pointer-events-none'>
        {model.size}MB
      </p>
      {open && (
        <div>
          <span className='block'>
            Created by{' '}
            <a target='_blank' href={model.info.creatorLink} rel='noreferrer'>
              {model.info.creator}
            </a>
          </span>
          <span className='block'> Licence: {model.info.license}</span>
          <a href={model.gltf} download>
            Download GLTF
          </a>
          <div style={{ width: 500, height: 500 }}>
            <ModelC buffer={model.buffer} />
          </div>
        </div>
      )}
    </li>
  )
}

const Page = ({ title, models }) => {
  useStore.setState({ title })
  return (
    <Layout>
      <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {models.map((model) => (
          <Model {...model} key={model.gltf} />
        ))}
      </ul>
    </Layout>
  )
}

export default Page
// This function gets called at build time on server-side.
// It won't be called on client-side.
export async function getStaticProps() {
  const models = getAllModels()

  return {
    props: {
      models,
      title: 'Models',
    },
  }
}
