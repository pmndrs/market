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
          {assetState.selectedType.name === 'Matcap' && (
            <FileDrop
              maxSize={1000000}
              onChange={assetState.uploadAsset}
              label='Upload your Matcap (max 1mb)'
            />
          )}

          {assetState.selectedType.name === 'PBR Material' && (
            <>
              <p
                htmlFor='upload'
                className='block mb-4 text-sm font-medium text-gray-700'
              >
                Upload your maps, only base color is required
              </p>
              <FileDrop
                maxSize={1000000}
                showPreview={false}
                onChange={(file) =>
                  useAddAssetStore.setState({
                    maps: {
                      ...assetState.maps,
                      map: file,
                    },
                  })
                }
                label='Base Color'
              />
              <FileDrop
                showPreview={false}
                maxSize={1000000}
                onChange={(file) =>
                  useAddAssetStore.setState({
                    maps: {
                      ...assetState.maps,
                      aoMap: file,
                    },
                  })
                }
                label='Ambient Occlusion'
              />
              <FileDrop
                maxSize={1000000}
                showPreview={false}
                onChange={(file) =>
                  useAddAssetStore.setState({
                    maps: {
                      ...assetState.maps,
                      displacementMap: file,
                    },
                  })
                }
                label='Height Map'
              />
              <FileDrop
                maxSize={1000000}
                showPreview={false}
                onChange={(file) =>
                  useAddAssetStore.setState({
                    maps: {
                      ...assetState.maps,
                      normalMap: file,
                    },
                  })
                }
                label='Normal Map'
              />
              <FileDrop
                maxSize={1000000}
                showPreview={false}
                onChange={(file) =>
                  useAddAssetStore.setState({
                    maps: {
                      ...assetState.maps,
                      roughnessMap: file,
                    },
                  })
                }
                label='Roughness Map'
              />
            </>
          )}

          <CreatorSelect />

          <TeamSelect />
          <div className='flex justify-end'>
            <Button
              onClick={onClick}
              disabled={
                assetState.selectedType.name === 'PBR Material'
                  ? !assetState.maps.map
                  : !assetState.file
              }
            >
              Submit Asset
            </Button>
          </div>
        </div>
      </form>
    </main>
  )
}

export default Step2
