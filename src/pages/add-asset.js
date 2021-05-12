import Layout from '@/components/layout/'
import { useState } from 'react'

// {
//   "name": "Bed",
//   "creator": {
//     "name": "Sara Vieira",
//     "link": "https://twitter.com/NikkitaFTW"
//   },
//   "team": {
//     "name": "pmndrs",
//     "link": "http://pmnd.rs/"
//   },
//   "license": 1,
//   "category": "furniture"
// }

const modelJSON = [
  {
    key: 'name',
    description: 'Name of your model',
    mandatory: true,
  },
  {
    key: 'creator.name',
    description: 'Your name',
    mandatory: true,
  },
  {
    key: 'creator.link',
    description: 'Where your name should link to',
    mandatory: true,
  },
  {
    key: 'team.name',
    description: 'If you are working in a team',
    mandatory: false,
  },
  {
    key: 'team.link',
    description: 'Team link',
    mandatory: false,
  },
  {
    key: 'license',
    description: '1 is CC0 and 2 is CC-BY',
    mandatory: true,
  },
  {
    key: 'category',
    description: 'A category for your model',
    mandatory: true,
  },
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

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
    <Layout title={'Add your own asset'}>
      <div className='m-auto max-w-[700px]'>
        <p className='mt-8 mb-4 text-xl text-center text-gray-500 leading-8'>
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
          {selectedTab === 'models' && (
            <>
              <p>First create a folder with the name of your mode, </p>
              <p>
                please do not leave spaces between the name, so instead of
                saying <code>a car</code> you should do <code>a-car</code>
              </p>

              <p className='mt-4'>
                The folder structure will be something like:
                <pre className='p-2 mt-2 bg-gray-100 rounded'>
                  <code>
                    {`my-model/
├─ info.json
├─ render.png
├─ model.gltf`}
                  </code>
                </pre>
              </p>
              <p className='mt-4'>
                Here are the fields in the <code>info.json</code>:
              </p>
              <div className='flex flex-col mt-6'>
                <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                  <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
                    <div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
                      <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-gray-50'>
                          <tr>
                            <th
                              scope='col'
                              className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                            >
                              Key
                            </th>
                            <th
                              scope='col'
                              className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                            >
                              Description
                            </th>
                            <th
                              scope='col'
                              className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                            >
                              Mandatory
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {modelJSON.map((info, keyidx) => (
                            <tr
                              key={info.key}
                              className={
                                keyidx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                              }
                            >
                              <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap'>
                                {info.key}
                              </td>
                              <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                                {info.description}
                              </td>
                              <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                                {info.mandatory.toString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <p className='mt-6'>
                To create a render a resolution of 420*320px is enough and you
                can find the starter blender file we used in most of our shots{' '}
                <a
                  href='https://github.com/pmndrs/market-assets/blob/main/starter.blend'
                  target='_blank'
                  rel='noreferrer'
                >
                  in the repo
                </a>
                , please all feel free to create your own renders
              </p>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default AddAsset
