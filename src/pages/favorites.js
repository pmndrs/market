import Layout from '@/components/layout/'
import { supabase } from '../helpers/initSupabase'
import Asset from '@/components/Asset'
import { API_ENDPOINT } from '@/helpers/constants/api'

const Favorites = ({ favorites }) => {
  return (
    <Layout title={'Your Favorites'}>
      <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {favorites.map((favorite) => (
          <Asset {...favorite} key={favorite.id} />
        ))}
      </ul>
    </Layout>
  )
}

export default Favorites

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
    .select('favorites')
    .eq('user_id', user.id)

  const url = `${API_ENDPOINT}/favorites?favs=${data[0].favorites}`
  const favorites = await fetch(url).json()

  return { props: { user, favorites } }
}
