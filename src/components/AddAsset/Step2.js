import { PlusIcon } from '@heroicons/react/solid'
import { useEffect, useRef, useState } from 'react'
import VerticalSelect from '@/components/Form/RadioGroup'
import Input from '@/components/Form/Input'
import FileDrop from '@/components/Form/FileDrop'
import { slugify } from '@/helpers/slugify'
import useAddAssetStore from '@/helpers/store/addAsset'
import FancySelect from '../Form/FancySelect'
import { supabase } from '@/helpers/initSupabase'
import useStore from '@/helpers/store'
import CreatorSelect from './CreatorSelect'
import TeamSelect from './TeamSelect'
import Button from '../Button'

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
            label='Upload your model (max 5mb). Only GLTF files are accepted'
          />
          <CreatorSelect />

          <TeamSelect />
          <div className='flex justify-end'>
            <Button onClick={onClick} disabled={!assetState.model}>
              Submit Asset
            </Button>
          </div>
        </div>
      </form>
    </main>
  )
}

export default Step2
