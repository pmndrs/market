import copy from 'clipboard-copy'
import useStore from '@/helpers/store/hdri'
import { useState } from 'react'
import { Leva } from 'leva'
import DownloadButton from './info/DownloadButton'
import Tabs from './info/Tabs'
import License from './info/License'
import Creators from './info/Creators'
import Category from './info/Category'
import Views from './info/Views'

const HDRIInfo = (hdri) => {
  const [tab, setTab] = useState('hdri')
  const { createHDRIDownload } = useStore((state) => ({
    createHDRIDownload: state.createHDRIDownload,
  }))

  const tabs = [
    {
      name: 'HDRI',
      onClick: () => setTab('hdri'),
      current: tab === 'hdri',
    },
    // {
    //   name: 'React Three Fiber',
    //   onClick: () => setTab('r3f'),
    //   current: tab === 'r3f',
    // },
    // {
    //   name: 'Three.js',
    //   onClick: () => setTab('three'),
    //   current: tab === 'three',
    // },
  ]
  return (
    <div className='mt-5'>
      <div className='z-10 hidden mb-6 sm:block w-[70%]'>
        <Leva fill />
      </div>
      <aside className='relative'>
        <Creators team={hdri.team} creator={hdri.creator} />
        <License license={hdri.license} />
        <span className='flex items-center'>
          <span className='pr-2 text-gray-600 '>Size: </span>{' '}
          <span className='inline-flex font-bold'>
            <span>{hdri.size}</span>
          </span>
        </span>
        <Category category={hdri.category} path='hdris' />
        <Views id={hdri.id} />
        <div className='my-4'>
          <Tabs tabs={tabs} />
          {/* <button
            className='block w-full py-2 mt-3 text-center text-white bg-gray-800 cursor-pointer'
            onClick={() => {
              createHDRIDownload(hdri, tab)
            }}
          >
            Download starter project
          </button> */}
        </div>
        <DownloadButton href={hdri.file} download>
          Download HDRI
        </DownloadButton>
        <DownloadButton onClick={() => copy(hdri.file)}>
          Copy direct link
        </DownloadButton>
      </aside>
    </div>
  )
}

export default HDRIInfo
