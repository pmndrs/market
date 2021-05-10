import copy from 'clipboard-copy'
import useStore from '@/helpers/store'
import parse from '@react-three/gltfjsx'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { licenses } from '../helpers/constants/licenses'
import Tippy from '@tippyjs/react'
import { useState } from 'react'
import { API_ENDPOINT } from '@/helpers/constants/api'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ModelInfo = (model) => {
  const [tab, setTab] = useState('r3f')
  const { parsedBuffer, createModelDownloadZip } = useStore((s) => ({
    parsedBuffer: s.parsedBuffer,
    createModelDownloadZip: s.createModelDownloadZip,
  }))

  const createCode = () => {
    const code = parse(`${model.url}.gltf`, parsedBuffer, {
      printwidth: 100,
    })

    return code
  }

  const copyToClipboard = () => {
    copy(createCode())
  }

  const createModelDownload = () => {
    const code = createCode()
    createModelDownloadZip(model, code, tab)
  }

  const items = [
    { name: 'Download Untextured', href: model.gltf },
    { name: 'Download Textured', href: model.gltfTextured },
  ]
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
      <div className='block mb-5 overflow-hidden bg-gray-100 rounded group w-80'>
        <img
          src={`${API_ENDPOINT}${model.image}`}
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
          {licenses[model.info.license] ? (
            <a
              target='_blank'
              href={licenses[model.info.license].link}
              rel='noreferrer'
              className='font-bold'
            >
              {licenses[model.info.license].name}
            </a>
          ) : (
            <span className='font-bold'>{model.info.license}</span>
          )}
        </span>
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
        {model.info.category && (
          <>
            <span className='text-gray-600'>Category: </span>
            <span className='inline-flex items-center px-2 mt-1 text-xs font-medium text-gray-800 bg-gray-100 rounded py-0.5'>
              {model.info.category}
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

          <button
            className='block w-full py-2 mt-3 text-center text-white bg-gray-800 rounded cursor-pointer disabled:opacity-75 disabled:cursor-auto'
            onClick={() => createModelDownload()}
            disabled={!parsedBuffer}
          >
            Download starter project
          </button>
        </div>
        {tab === 'r3f' && (
          <button
            className='block w-full py-2 text-center text-white bg-gray-800 rounded disabled:opacity-75'
            onClick={copyToClipboard}
            disabled={!parsedBuffer}
          >
            Copy JSX Code
          </button>
        )}
        <span className='relative z-0 inline-flex w-full mt-4 rounded shadow-sm'>
          <a
            href={`${API_ENDPOINT}${
              model.gltfTextured ? model.gltfTextured : model.gltf
            }`}
            download
            className='relative inline-flex items-center justify-center flex-grow'
          >
            <button
              type='button'
              className={`w-full px-4 py-2 font-medium text-white bg-indigo-600 border border-indigo-300 hover:bg-indigo-500 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                model.gltfTextured ? 'rounded-l ' : 'rounded '
              }`}
            >
              Download Model
            </button>
          </a>
          {model.gltfTextured && (
            <Menu as='span' className='relative block -ml-px'>
              {({ open }) => (
                <>
                  <Menu.Button className='relative inline-flex items-center h-full px-2 py-2 font-medium text-white bg-indigo-600 border border-indigo-300 hover:bg-indigo-500 rounded-r-md focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 align-center'>
                    <span className='sr-only'>Open options</span>
                    <ChevronDownIcon className='w-5 h-5' aria-hidden='true' />
                  </Menu.Button>
                  <Transition
                    show={open}
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items
                      static
                      className='absolute right-0 w-56 mt-2 -mr-1 bg-white shadow-lg origin-top-right rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none'
                    >
                      <div className='py-1'>
                        {items.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                download
                                href={`${API_ENDPOINT}${item.href}`}
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          )}
        </span>
      </aside>
    </div>
  )
}

export default ModelInfo
