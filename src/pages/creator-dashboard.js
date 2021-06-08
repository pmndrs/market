import Layout from '@/components/layout/'
import { supabase } from '../helpers/initSupabase'
import Asset from '@/components/Asset'
import { getSize } from '@/helpers/getSize'

const Assets = ({ assets }) => {
  return (
    <Layout title={'Your Assets'}>
      <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {assets.map((asset) => (
          <Asset {...asset} key={asset.id} />
        ))}
      </ul>
    </Layout>
  )
}

export default Assets

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  console.log(user)
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
    .select('id')
    .eq('user_id', user.id)
    .limit(1)

  const { data: models } = await supabase
    .from('models')
    .select()
    .filter('user_id', 'eq', data[0].id)

  return {
    props: {
      user,
      assets: [
        ...models.map((m) => {
          const { size } = getSize(m.size)
          return {
            ...m,
            id: m._id,
            _id: m.id,
            size,
          }
        }),
      ],
    },
  }
}
