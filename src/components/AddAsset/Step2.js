import FileDrop from '@/components/Form/FileDrop'
import useAddAssetStore from '@/helpers/store/addAsset'
import CreatorSelect from './CreatorSelect'
import TeamSelect from './TeamSelect'
import Button from '../Button'

const Step2 = ({ onClick }) => {
  const assetState = useAddAssetStore()

  return (
    <main className='max-w-lg px-4 pt-10 pb-12 mx-auto lg:pb-16'>
      <form>
        <div className='space-y-6'>
          <div>
            <p className='mt-1 text-sm text-gray-500'>
              Let{"'"}s upload your asset
            </p>
          </div>
          {assetState.selectedType.url === 'models' && (
            <FileDrop
              maxSize={5000000}
              accept='.gltf'
              showPreview={false}
              onChange={assetState.uploadModel}
              label='Upload your model (max 5mb). Only GLTF files are accepted'
            />
          )}

          {assetState.selectedType.url === 'hdris' && (
            <FileDrop
              maxSize={5000000}
              accept='.hdr'
              showPreview={false}
              onChange={assetState.uploadAsset}
              label='Upload your HDRI (max 5mb)'
            />
          )}

          <CreatorSelect />

          <TeamSelect />
          <div className='flex justify-end'>
            <Button onClick={onClick} disabled={!assetState.file}>
              Submit Asset
            </Button>
          </div>
        </div>
      </form>
    </main>
  )
}

export default Step2
