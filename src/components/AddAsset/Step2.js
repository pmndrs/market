import { PlusIcon } from '@heroicons/react/solid'
import { useEffect, useRef } from 'react'
import VerticalSelect from '@/components/Form/RadioGroup'
import Input from '@/components/Form/Input'
import FileDrop from '@/components/Form/FileDrop'
import { slugify } from '@/helpers/slugify'
import useAddAssetStore from '@/helpers/store/addAsset'
import FancySelect from '../Form/FancySelect'

const Step2 = ({ onClick }) => {
  const assetState = useAddAssetStore()

  return (
    <main className='max-w-lg mx-auto pt-10 pb-12 px-4 lg:pb-16'>
      <form>
        <div className='space-y-6'>
          <div>
            <p className='mt-1 text-sm text-gray-500'>
              Let's upload your asset
            </p>
          </div>

          <FileDrop
            maxSize={5000000}
            accept='.gltf'
            showPreview={false}
            onChange={assetState.uploadModel}
            label='Upload your model (max 5mb)'
          />
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
          <div className='flex justify-end'>
            <button
              onClick={onClick}
              type='submit'
              className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              Next Step
            </button>
          </div>
        </div>
      </form>
    </main>
  )
}

export default Step2
