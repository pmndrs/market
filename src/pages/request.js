import useStore from '@/helpers/store/requests'
import Layout from '@/components/layout/'
import { supabase } from '../helpers/initSupabase'
import AssetRequestForm from '@/components/RequestAsset/AssetRequestForm'
import Request from '@/components/RequestAsset/Request'
import { useEffect } from 'react'
import Tippy from '@tippyjs/react'
import { useState } from 'react'
import classNames from '@/helpers/classNames'
import Button from '@/components/Button'

const RequestPage = ({ user, requests: requestsServer }) => {
  const [tab, setTab] = useState('open')
  const { requesting, submitRequest, setRequests, requests } = useStore(
    (s) => ({
      requesting: s.requesting,
      submitRequest: s.submitRequest,
      setRequests: s.setRequests,
      requests: s.requests,
    })
  )
  const tabs = [
    { name: 'Open', onClick: () => setTab('open'), current: tab === 'open' },
    {
      name: 'Closed',
      onClick: () => setTab('closed'),
      current: tab === 'closed',
    },
  ]

  useEffect(() => {
    setRequests(requestsServer)
  }, [requestsServer, setRequests])

  const currentRequests =
    tab === 'open'
      ? requests.filter((r) => !r.closed)
      : requests.filter((r) => r.closed)

  return (
    <Layout noTitle>
      <>
        <div className='flex justify-between py-10'>
          <h1
            className={`text-3xl font-bold leading-tight text-gray-900 
                  `}
          >
            Model Requests
          </h1>
          <Tippy
            content={'You need an account to request an asset'}
            disabled={user}
          >
            <div>
              <Button
                disabled={!user}
                onClick={() =>
                  user ? useStore.setState({ requesting: !requesting }) : null
                }
              >
                Request an Asset
              </Button>
            </div>
          </Tippy>
        </div>
        {requesting && (
          <AssetRequestForm
            onSubmit={(props) => submitRequest({ ...props, user })}
          />
        )}
      </>
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
            onChange={(e) => setTab(e.target.value)}
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
      <div className='mt-10 overflow-hidden bg-white shadow sm:rounded-md'>
        <ul className='divide-y divide-gray-200'>
          {currentRequests.map((request) => (
            <Request closed={tab === 'closed'} {...request} key={request.id} />
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default RequestPage

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  const { data } = await supabase.from('requests').select()
  const requests = data.sort((a, b) => a.upvotes.length > b.upvotes.length)

  return { props: { user, requests } }
}
