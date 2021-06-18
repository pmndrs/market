import Layout from '@/components/layout/'
import { supabase } from '../helpers/initSupabase'
import Asset from '@/components/Asset'
import { getSize } from '@/helpers/getSize'
import Button from '@/components/Button'
import { useState } from 'react'

const Assets = ({ assets: starterAssets }) => {
  const [assets, setAssets] = useState(starterAssets)

  const approveAsset = async (id, path) => {
    await supabase
      .from(path.split('/')[0] + 's')
      .update({ approved: true })
      .eq('id', id)

    setAssets(assets.filter((a) => a._id !== id))
  }
  const deleteAsset = async (id, path) => {
    const from = path.split('/')[0] + 's'
    await supabase.from(from).delete().eq('id', id)
    await supabase.storage
      .from(from)
      .remove([
        `${path.split('/')[1]}/model.gltf`,
        `${path.split('/')[1]}/thumbnail.png`,
      ])
    setAssets(assets.filter((a) => a._id !== id))
  }
  return (
    <Layout title={'Assets to Approve'}>
      <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {assets.map((asset) => (
          <div key={asset.id}>
            <Asset {...asset} />
            <div className='flex gap-2'>
              <Button
                onClick={() => deleteAsset(asset._id, asset.id)}
                className='w-full mt-4 bg-red-600'
              >
                Delete
              </Button>
              <Button
                onClick={() => approveAsset(asset._id, asset.id)}
                className='w-full mt-4 bg-green-600'
              >
                Approve
              </Button>
            </div>
          </div>
        ))}
      </ul>
    </Layout>
  )
}

export default Assets

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }
  const { data } = await supabase
    .from('profiles')
    .select('admin')
    .eq('user_id', user.id)
    .limit(1)

  if (!data[0].admin) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  const cleanAssets = (assets) =>
    assets.map((m) => {
      const { size } = getSize(m.size)
      return {
        ...m,
        id: m._id,
        _id: m.id,
        size,
      }
    })

  const { data: models } = await supabase
    .from('models')
    .select()
    .filter('approved', 'eq', false)

  const { data: materials } = await supabase
    .from('materials')
    .select()
    .filter('approved', 'eq', false)
  const { data: hdris } = await supabase
    .from('hdris')
    .select()
    .filter('approved', 'eq', false)

  return {
    props: {
      user,
      assets: [
        ...cleanAssets(models),
        ...cleanAssets(materials),
        ...cleanAssets(hdris),
      ],
    },
  }
}
