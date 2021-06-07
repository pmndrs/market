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
