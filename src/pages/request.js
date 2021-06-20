import useStore from '@/helpers/store/requests'
import Layout from '@/components/layout/'
import { supabase } from '../helpers/initSupabase'
import AssetRequestForm from '@/components/RequestAsset/AssetRequestForm'
import Request from '@/components/RequestAsset/Request'
import { useEffect } from 'react'
import Tippy from '@tippyjs/react'
import { useState } from 'react'
import Button from '@/components/Button'
import Tabs from '@/components/Tabs'

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
      <Tabs
        tabs={[
          {
            name: `Open (${requests.filter((r) => !r.closed).length})`,
            onClick: () => setTab('open'),
            current: tab === 'open',
          },
          {
            name: `Closed (${requests.filter((r) => r.closed).length})`,
            onClick: () => setTab('closed'),
            current: tab === 'closed',
          },
        ]}
      />
      <div className='mt-10 overflow-hidden bg-white shadow sm:rounded-md'>
        <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
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
