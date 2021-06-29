import Layout from '@/components/layout/'
import { supabase } from '../helpers/initSupabase'
import Asset from '@/components/Asset'
import { getSize } from '@/helpers/getSize'
import { useEffect, useState } from 'react'
import useStore from '@/helpers/store'

const Assets = ({ assets: starterAssets }) => {
  const [assets, setAssets] = useState(starterAssets)

  useEffect(() => {
    useStore.setState({ title: 'Admin Dashboard' })
  })

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
              <button
                onClick={() => deleteAsset(asset._id, asset.id)}
                className='relative items-center w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-red-600 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 disabled:opacity-60 disabled:cursor-auto'
              >
                Delete
              </button>
              <button
                onClick={() => approveAsset(asset._id, asset.id)}
                className='relative items-center w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-green-600 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 disabled:opacity-60 disabled:cursor-auto'
              >
                Approve
              </button>
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
