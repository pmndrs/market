import { useState, useEffect } from 'react'

import copy from 'clipboard-copy'
import parse from '@react-three/gltfjsx'
import Tippy from '@tippyjs/react'

import { Leva } from 'leva'

import useStore from '@/helpers/store'
import DownloadButton from './info/DownloadButton'
import Tabs from './info/Tabs'
import License from './info/License'
import Creators from './info/Creators'
import Category from './info/Category'
import Views from './info/Views'

const ModelInfo = (model) => {
  const [tab, setTab] = useState('model')
  const { parsedBuffer, createModelDownloadZip } = useStore((s) => ({
    parsedBuffer: s.parsedBuffer,
    createModelDownloadZip: s.createModelDownloadZip,
  }))

  const createCode = () => {
    const code = parse(model.file, parsedBuffer, {
      printwidth: 100,
    })

    return code
  }

  const copyToJSXSceneCode = () => {
    copy(createCode())
  }

  const copyPrimitiveCode = () => {
    const code = `
  function Model(props) {
    const { scene } = useGLTF('${model.file}')
    return <primitive object={scene} {...props} />
  }    
  `

    copy(code)
  }

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
        <span className='flex items-center'>
          <span className='pr-2 text-gray-600 '>Size: </span>{' '}
          <span className='inline-flex font-bold'>
            {model.highPoly && (
              <Tippy content='Large model'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5 mr-1 text-yellow-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                  />
                </svg>
              </Tippy>
            )}
            <span>{model.size}</span>
          </span>
        </span>
        <Category category={model.category} path='models' />
        <Views views={model.views} />
        <div className='my-4'>
          <Tabs tabs={tabs} />

          {tab !== 'model' && (
            <DownloadButton
              onClick={() => createModelDownload()}
              disabled={!parsedBuffer}
            >
              Download starter project
            </DownloadButton>
          )}
        </div>
        {tab === 'r3f' && (
          <>
            <DownloadButton
              onClick={copyToJSXSceneCode}
              disabled={!parsedBuffer}
            >
              Copy JSX Scene Graph
            </DownloadButton>
            <DownloadButton onClick={copyPrimitiveCode}>
              Copy Primitive Import
            </DownloadButton>
          </>
        )}
        {tab === 'model' && (
          <>
            <DownloadButton href={model.file} download style={{ marginTop: 0 }}>
              Download Model
            </DownloadButton>
            <DownloadButton onClick={() => copy(model.file)}>
              Copy direct link
            </DownloadButton>
          </>
        )}
      </aside>
    </div>
  )
}

export default ModelInfo
