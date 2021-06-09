import { useEffect } from 'react'
import VerticalSelect from '@/components/Form/RadioGroup'
import Input from '@/components/Form/Input'
import FileDrop from '@/components/Form/FileDrop'
import { slugify } from '@/helpers/slugify'
import useAddAssetStore from '@/helpers/store/addAsset'
import FancySelect from '../Form/FancySelect'
import { supabase } from '@/helpers/initSupabase'
import Button from '../Button'

const Step1 = ({ onClick }) => {
  const assetState = useAddAssetStore()

  useEffect(() => {
    useAddAssetStore.setState({ selectedType: assetState.assetTypes[0] })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (assetState.name) {
      const slug = slugify(assetState.name)

      useAddAssetStore.setState({ slug })
      checkAvailability(slug)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetState.name])

  const checkAvailability = async (slug) => {
    const type = assetState.selectedType.url.slice(0, -1)

    const { data } = await supabase
      .from(assetState.selectedType.url)
      .select('id')
      .filter('_id', 'eq', `${type}/${slug}`)

    useAddAssetStore.setState({ slugAvailable: !data.length })
  }

  const updateSlug = (slug) => {
    useAddAssetStore.setState({ slug })
    if (slug) {
      checkAvailability(slug)
    } else {
      useAddAssetStore.setState({ slugAvailable: false })
    }
  }

  const setAssetType = (type) => {
    useAddAssetStore.setState({ selectedType: type })
    if (type.url === 'materials') {
      useAddAssetStore.setState({
        category: type.name === 'Matcap' ? 'matcaps' : 'PBR',
      })
    }
  }
  return (
    <main className='max-w-lg px-4 pt-10 pb-12 mx-auto lg:pb-16'>
      <form>
        <div className='space-y-6'>
          <div>
            <p className='mt-1 text-sm text-gray-500'>
              Some info about your asset
            </p>
          </div>
          <VerticalSelect
            value={assetState.selectedType}
            onChange={setAssetType}
            label='Type of Asset'
            options={assetState.assetTypes}
          />
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
            onChange={updateSlug}
            Error={() => {
              return !assetState.slugAvailable ? (
                <p className='mt-2 text-sm text-red-600' id='email-error'>
                  The slug is not available
                </p>
              ) : null
            }}
          />

          <VerticalSelect
            value={assetState.license}
            onChange={(s) => useAddAssetStore.setState({ license: s })}
            label='License'
            options={assetState.licenses}
          />

          {assetState.selectedType.url !== 'materials' && <FancySelect />}
          <FileDrop
            description={
              <>
                To create a render a resolution of 420*320px is enough and you
                can find the starter blender file we used in most of our shots{' '}
                <a
                  target='_blank'
                  href='https://github.com/pmndrs/market-assets/blob/main/starter.blend'
                  rel='noreferrer'
                >
                  in the repo
                </a>
                , please feel free to create your own renders.
              </>
            }
            label=' Upload your thumbnail'
            onChange={assetState.uploadFile}
          />
          <div className='flex justify-end'>
            <Button
              disabled={
                !assetState.slugAvailable ||
                !assetState.category ||
                !assetState.thumbnail
              }
              onClick={onClick}
            >
              Next Step
            </Button>
          </div>
        </div>
      </form>
    </main>
  )
}

export default Step1
