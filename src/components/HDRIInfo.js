import useStore from '@/helpers/store/hdri'
import { licenses } from '@/helpers/constants/licenses'
import { useState } from 'react'
import { API_ENDPOINT } from '@/helpers/constants/api'
import { Leva } from 'leva'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const HDRIInfo = (hdri) => {
  const [tab, setTab] = useState('r3f')
  const { createHDRIDownload } = useStore((state) => ({
    createHDRIDownload: state.createHDRIDownload,
  }))

  const tabs = [
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
        <Leva fill />
      </div>
      <aside className='relative'>
        <span className='text-gray-600'>Created by: </span>
        <a
          target='_blank'
          href={hdri.creator.link}
          rel='noreferrer'
          className='font-bold'
        >
          {hdri.creator.name}
        </a>
        <span className='block'>
          <span className='text-gray-600'>License: </span>{' '}
          {licenses[hdri.license] ? (
            <a
              target='_blank'
              href={licenses[hdri.license].link}
              rel='noreferrer'
              className='font-bold'
            >
              {licenses[hdri.license].name}
            </a>
          ) : (
            <span className='font-bold'>{hdri.license}</span>
          )}
        </span>
        <span className='flex items-center'>
          <span className='pr-2 text-gray-600 '>Size: </span>{' '}
          <span className='inline-flex font-bold'>
            <span>{hdri.size}</span>
          </span>
        </span>
        {hdri.category && (
          <>
            <span className='text-gray-600'>Category: </span>
            <span className='inline-flex items-center px-2 mt-1 text-xs font-medium text-gray-800 bg-gray-100 rounded py-0.5'>
              {hdri.category}
            </span>
          </>
        )}
        <div className='my-4'>
          <div>
            <div className='sm:hidden'>
              <label htmlFor='tabs' className='sr-only'>
                Select a tab
              </label>
              <select
                id='tabs'
                name='tabs'
                className='block w-full py-2 pl-3 pr-10 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
                defaultValue={tabs.find((tab) => tab.current).name}
              >
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className='hidden sm:block'>
              <div className='border-b border-gray-200'>
                <nav className='flex -mb-px space-x-8' aria-label='Tabs'>
                  {tabs.map((tab) => (
                    <button
                      key={tab.name}
                      onClick={tab.onClick}
                      className={classNames(
                        tab.current
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                      )}
                      aria-current={tab.current ? 'page' : undefined}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* <button
            className='block w-full py-2 mt-3 text-center text-white bg-gray-800 cursor-pointer'
            onClick={() => {
              createHDRIDownload(hdri, tab)
            }}
          >
            Download starter project
          </button> */}
        </div>
        <a
          className='block w-full py-2 text-center text-white bg-gray-800'
          href={API_ENDPOINT + hdri.file}
          download
        >
          Download HDRI
        </a>
      </aside>
    </div>
  )
}

export default HDRIInfo
