import AddHdri from '@/components/AddAsset/Hdri'
import AddMatcap from '@/components/AddAsset/Matcap'
import AddModel from '@/components/AddAsset/Model'
import AddPBR from '@/components/AddAsset/PBR'
import Layout from '@/components/layout/'
import classNames from '@/helpers/classNames'
import { useState } from 'react'

const AddAsset = () => {
  const [selectedTab, setSelectedTab] = useState('models')

  const tabs = [
    {
      name: 'Model',
      onClick: () => setSelectedTab('models'),
      current: selectedTab === 'models',
    },
    {
      name: 'HDRI',
      onClick: () => setSelectedTab('hdris'),
      current: selectedTab === 'hdris',
    },
    {
      name: 'PBR Material',
      onClick: () => setSelectedTab('pbr'),
      current: selectedTab === 'pbr',
    },
    {
      name: 'Matcap',
      onClick: () => setSelectedTab('matcaps'),
      current: selectedTab === 'matcaps',
    },
  ]

  return (
    <Layout title={'Add your own asset'} center>
      <div className='m-auto max-w-[700px]'>
        <p className='mt-8 mb-8 text-xl text-center text-gray-500 leading-8'>
          First of all thank you so much for wanting to make the market better,
          with your help we can make the web more fun.
        </p>
        <p>
          All our assets are hosted on GitHub so you need to know some basics of
          GitHub to know how to create a pull request with your asset.{' '}
        </p>
        <p>
          You can find our assets here:{' '}
          <a
            href='https://github.com/pmndrs/market-assets'
            target='_blank'
            rel='noreferrer'
            className='underline'
          >
            pmndrs/market-assets
          </a>{' '}
          and you will need to create a new folder inside the files folder
        </p>

        <p>
          Please choose the type of asset you want to add and I will tell you
          what you need to provide
        </p>

        <div className='mt-10'>
          <div className='sm:hidden'>
            <label htmlFor='tabs' className='sr-only'>
              Select a tab
            </label>
            <select
              id='tabs'
              name='tabs'
              className='block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md'
              defaultValue={tabs.find((tab) => tab.current).name}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className='hidden sm:block'>
            <div className='border-b border-gray-200'>
              <nav className='flex -mb-px' aria-label='Tabs'>
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={tab.onClick}
                    className={classNames(
                      tab.current
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                      'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm'
                    )}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className='mt-6'>
          {selectedTab === 'models' && <AddModel />}
          {selectedTab === 'hdris' && <AddHdri />}
          {selectedTab === 'pbr' && <AddPBR />}
          {selectedTab === 'matcaps' && <AddMatcap />}
        </div>
      </div>
    </Layout>
  )
}

export default AddAsset
