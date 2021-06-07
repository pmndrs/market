import { PlusIcon } from '@heroicons/react/solid'
import { useEffect } from 'react'
import VerticalSelect from '@/components/Form/RadioGroup'
import Input from '@/components/Form/Input'
import FileDrop from '@/components/Form/FileDrop'
import { slugify } from '@/helpers/slugify'
import useAddAssetStore from '@/helpers/store/addAsset'
import FancySelect from '../Form/FancySelect'

const Step1 = ({ onClick }) => {
  const assetState = useAddAssetStore()

  useEffect(() => {
    useAddAssetStore.setState({ selectedType: assetState.assetTypes[0] })
  }, [])

  useEffect(() => {
    if (assetState.name) {
      useAddAssetStore.setState({ slug: slugify(assetState.name) })
    }
  }, [assetState.name])

  return (
    <main className='max-w-lg mx-auto pt-10 pb-12 px-4 lg:pb-16'>
      <form>
        <div className='space-y-6'>
          <div>
            <p className='mt-1 text-sm text-gray-500'>
              Some info about your asset
            </p>
          </div>
          <Input
            key='name'
            label='Asset Name'
            value={assetState.name}
            onChange={(name) => useAddAssetStore.setState({ name })}
          />

          <Input
            key='slug'
            label='Slug'
            value={assetState.slug}
            onChange={(slug) => useAddAssetStore.setState({ slug })}
          />

          <div className='space-y-2'>
            <div className='space-y-1'>
              <label
                htmlFor='add_team_members'
                className='block text-sm font-medium text-gray-700'
              >
                Add Team Members
              </label>
              <p id='add_team_members_helper' className='sr-only'>
                Search by email address
              </p>
              <div className='flex'>
                <div className='flex-grow'>
                  <input
                    type='text'
                    name='add_team_members'
                    id='add_team_members'
                    className='block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md'
                    placeholder='Email address'
                    aria-describedby='add_team_members_helper'
                  />
                </div>
                <span className='ml-3'>
                  <button
                    type='button'
                    className='bg-white inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  >
                    <PlusIcon
                      className='-ml-2 mr-1 h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                    <span>Add</span>
                  </button>
                </span>
              </div>
            </div>
          </div>
          <VerticalSelect
            value={assetState.selectedType}
            onChange={(s) => useAddAssetStore.setState({ selectedType: s })}
            label='Type of Asset'
            options={assetState.assetTypes}
          />
          <VerticalSelect
            value={assetState.license}
            onChange={(s) => useAddAssetStore.setState({ license: s })}
            label='License'
            options={assetState.licenses}
          />

          <FancySelect />
          <FileDrop
            label=' Upload your thumbnail'
            onChange={assetState.uploadFile}
          />
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

export default Step1
