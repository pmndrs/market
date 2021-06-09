import { useState, useEffect } from 'react'

import copy from 'clipboard-copy'
import parse from '@react-three/gltfjsx'

import { Leva } from 'leva'

import useStore from '@/helpers/store'
import DownloadButton from './info/DownloadButton'
import Tabs from './Tabs'
import License from './info/License'
import Creators from './info/Creators'
import Category from './info/Category'
import Views from './info/Views'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import Link from 'next/link'

const ModelInfo = (model) => {
  const router = useRouter()
  const [tab, setTab] = useState('model')
  const { createBuffer, parsedBuffer, createModelDownloadZip } = useStore(
    (s) => ({
      createBuffer: s.createBuffer,
      parsedBuffer: s.parsedBuffer,
      createModelDownloadZip: s.createModelDownloadZip,
    })
  )

  useEffect(() => {
    if (tab === 'r3f') createBuffer(router.query.name)
  }, [tab, createBuffer, router.query.name])

  const createCode = () => {
    const code = parse(model.file, parsedBuffer, {
      printwidth: 100,
    })

    return code
  }

  const primitiveCode = `
  function Model(props) {
    const { scene } = useGLTF('${model.file}')
    return <primitive object={scene} {...props} />
  }`

  const createModelDownload = () => {
    const code = createCode()
    createModelDownloadZip(model, code, tab)
  }

  const tabs = [
    {
      name: 'Model',
      onClick: () => setTab('model'),
      current: tab === 'model',
    },
    {
      name: 'React Three Fiber',
      onClick: () => setTab('r3f'),
      current: tab === 'r3f',
    },
    {
      name: 'Three.js',
      onClick: () => setTab('three'),
      current: tab === 'three',
    },
  ]

  return (
    <div className='mt-5'>
      <div className='z-10 hidden mb-6 sm:block w-[70%]'>
        <Leva
          fill
          titleBar={{
            drag: false,
          }}
        />
      </div>
      <aside className='relative'>
        <Creators team={model.team} creator={model.creator} />
        <License license={model.license} />
        <Category category={model.category} path='models' />
        <Views views={model.views} />
        <div className='my-4'>
          <Tabs tabs={tabs} />

          {tab !== 'model' && (
            <DownloadButton
              onClick={() =>
                toast.promise(copy(createModelDownload()), {
                  loading: 'Generating project',
                  success: 'Downloaded',
                })
              }
              disabled={!parsedBuffer}
            >
              Download starter project
            </DownloadButton>
          )}
        </div>
        {tab === 'r3f' && (
          <>
            <DownloadButton
              onClick={() =>
                toast.promise(copy(createCode()), {
                  loading: 'Generating code',
                  success: 'Copied',
                })
              }
              disabled={!parsedBuffer}
            >
              Copy JSX Scene Graph
            </DownloadButton>
            <DownloadButton
              onClick={() =>
                toast.promise(copy(primitiveCode), {
                  loading: 'Generating code',
                  success: 'Copied',
                })
              }
            >
              Copy Primitive Import
            </DownloadButton>
          </>
        )}
        {tab === 'model' && (
          <>
            <DownloadButton href={model.file} download style={{ marginTop: 0 }}>
              Download Model
            </DownloadButton>
            <DownloadButton
              onClick={() =>
                toast.promise(copy(model.file), {
                  loading: 'Generating Link',
                  success: 'Copied',
                })
              }
            >
              Copy direct link
            </DownloadButton>
          </>
        )}
      </aside>
      {!model.stats.textures.properties.length && (
        <Link href={`/editor/${router.query.name}`}>
          <a
            className='block w-full py-2 text-center text-white bg-gray-800 disabled:opacity-75 disabled:cursor-auto'
            style={{ marginTop: 20 }}
          >
            Edit Materials
          </a>
        </Link>
      )}
    </div>
  )
}

export default ModelInfo
