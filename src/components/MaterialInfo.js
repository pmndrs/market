import copy from 'clipboard-copy'
import useStore from '@/helpers/store/materials'
import { getMaterialSize } from '@/helpers/getMaterialSize'
import { useState } from 'react'
import { Leva } from 'leva'
import DownloadButton from './info/DownloadButton'
import Tabs from './Tabs'
import License from './info/License'
import Creators from './info/Creators'
import Category from './info/Category'
import Views from './info/Views'
import toast from 'react-hot-toast'

const ModelInfo = (material) => {
  const [tab, setTab] = useState('material')
  const {
    createZip,
    createMatcapCodeDownload,
    createPBRCodeDownload,
  } = useStore((state) => ({
    createZip: state.createZip,
    createMatcapCodeDownload: state.createMatcapCodeDownload,
    createPBRCodeDownload: state.createPBRCodeDownload,
  }))

  const tabs = [
    {
      name: 'Material',
      onClick: () => setTab('material'),
      current: tab === 'material',
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
        <Creators team={material.team} creator={material.creator} />
        <License license={material.license} />
        <span className='flex items-center'>
          <span className='pr-2 text-gray-600 '>Size: </span>{' '}
          <span className='inline-flex font-bold'>
            <span>{getMaterialSize(material)}</span>
          </span>
        </span>
        <Category category={material.category} path='materials' />
        <Views views={material.views} />
        <div className='my-4'>
          <Tabs tabs={tabs} />
          {tab !== 'material' && (
            <button
              className='block w-full py-2 mt-3 text-center text-white bg-gray-800 cursor-pointer'
              onClick={() => {
                const promise =
                  material.category === 'matcaps'
                    ? createMatcapCodeDownload(material, tab)
                    : createPBRCodeDownload(material, tab)

                toast.promise(promise, {
                  loading: 'Generating Starter Project',
                  success: 'Ready',
                })
              }}
            >
              Download starter project
            </button>
          )}
        </div>
        {tab === 'material' ? (
          material.category === 'matcaps' ? (
            <>
              <DownloadButton href={material.file}>
                Download Matcap
              </DownloadButton>
              <DownloadButton
                onClick={() =>
                  toast.promise(copy(material.file), {
                    loading: 'Copying',
                    success: 'Copied to Clipboard',
                  })
                }
              >
                Copy direct link
              </DownloadButton>
            </>
          ) : (
            <>
              <DownloadButton
                onClick={() =>
                  toast.promise(
                    copy(`
                  const textures = ${JSON.stringify(material.maps, null, 2)}
                  `),
                    {
                      loading: 'Copying',
                      success: 'Copied to Clipboard',
                    }
                  )
                }
              >
                Copy direct links
              </DownloadButton>
              <DownloadButton
                onClick={() =>
                  toast.promise(createZip(material), {
                    loading: 'Generating Zip',
                    success: 'Downloaded',
                  })
                }
              >
                Download Textures
              </DownloadButton>
            </>
          )
        ) : null}
      </aside>
    </div>
  )
}

export default ModelInfo
