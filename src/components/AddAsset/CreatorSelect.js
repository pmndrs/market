import { supabase } from '@/helpers/initSupabase'
import { slugify } from '@/helpers/slugify'
import useAddAssetStore from '@/helpers/store/addAsset'
import { useEffect, useState } from 'react'
import Input from '../Form/Input'

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetState.creator.name])

  return (
    <div>
      <p className='block text-sm font-medium text-gray-700'>Creator</p>

      <div className='flex items-center mt-2'>
        <input
          onChange={(e) =>
            useAddAssetStore.setState({ creatorMe: e.target.checked })
          }
          checked={assetState.creatorMe}
          id='creator_me'
          name='creator_me'
          type='checkbox'
          className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
        />
        <label
          htmlFor='creator_me'
          className='block ml-2 text-sm text-gray-900'
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
              className='block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
              value={assetState.creatorID}
              onChange={(e) =>
                useAddAssetStore.setState({
                  creatorID: parseInt(e.target.value),
                })
              }
            >
              <option>Please select a creator</option>
              {creators.map((creator) => (
                <option value={creator.id} key={creator.id}>
                  {creator.name}
                </option>
              ))}
            </select>
          </div>
          <div className='mt-4'>
            <span className='block mb-2 text-sm font-medium text-gray-700'>
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
              key='creator-logo'
              label='Image Link'
              value={assetState.creator.logo}
              onChange={(logo) =>
                useAddAssetStore.setState({
                  creator: {
                    ...assetState.creator,
                    logo,
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
