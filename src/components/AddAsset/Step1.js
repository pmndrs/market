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
