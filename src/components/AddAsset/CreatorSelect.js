import { supabase } from '@/helpers/initSupabase'
import useAddAssetStore from '@/helpers/store/addAsset'
import { useEffect, useState } from 'react'

const CreatorSelect = () => {
  const assetState = useAddAssetStore()
  const [creators, setCreators] = useState([])

  useEffect(() => {
    supabase
      .from('creators')
      .select('id,name')
      .then((rsp) => setCreators(rsp.data))
  }, [])

  useEffect(() => {
    if (assetState.creator.name) {
      useAddAssetStore.setState({
        creator: {
          ...assetState.creator,
          slug: slugify(assetState.creator.name),
        },
      })
    }
  }, [assetState.creator.name])

  return (
    <div>
      <label
        htmlFor='upload'
        className='block text-sm font-medium text-gray-700'
      >
        Creator
      </label>

      <div className='flex items-center mt-2'>
        <input
          onChange={(e) =>
            useAddAssetStore.setState({ creatorMe: e.target.checked })
          }
          checked={assetState.creatorMe}
          id='creator_me'
          name='creator_me'
          type='checkbox'
          className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
        />
        <label
          htmlFor='creator_me'
          className='ml-2 block text-sm text-gray-900'
        >
          I am the creator
        </label>
      </div>
      {!assetState.creatorMe && (
        <>
          <div className='mt-4'>
            <label
              htmlFor='creator'
              className='block text-sm font-medium text-gray-700'
            >
              Select a creator
            </label>
            <select
              id='creator'
              name='creator'
              className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
            >
              <option>Please select a creator</option>
              {creators.map((creator) => (
                <option value={creator.id}>{creator.name}</option>
              ))}
            </select>
          </div>
          <div className='mt-4'>
            <span className='block text-sm font-medium text-gray-700 mb-2'>
              Or create a new one
            </span>
            <Input
              key='creator-name'
              label='Name'
              value={assetState.creator.name}
              onChange={(name) =>
                useAddAssetStore.setState({
                  creator: {
                    ...assetState.creator,
                    name,
                  },
                })
              }
            />
          </div>
          <div className='mt-2'>
            <Input
              key='creator-link'
              label='Link'
              value={assetState.creator.link}
              onChange={(link) =>
                useAddAssetStore.setState({
                  creator: {
                    ...assetState.creator,
                    link,
                  },
                })
              }
            />
          </div>{' '}
          <div className='mt-2'>
            <Input
              key='creator-imageLink'
              label='Image Link'
              value={assetState.creator.imageLink}
              onChange={(imageLink) =>
                useAddAssetStore.setState({
                  creator: {
                    ...assetState.creator,
                    imageLink,
                  },
                })
              }
            />
          </div>{' '}
          <div className='mt-2'>
            <Input
              key='creator-donateLink'
              label='Donate Link'
              value={assetState.creator.donateLink}
              onChange={(donateLink) =>
                useAddAssetStore.setState({
                  creator: {
                    ...assetState.creator,
                    donateLink,
                  },
                })
              }
            />
          </div>
        </>
      )}
    </div>
  )
}

export default CreatorSelect
