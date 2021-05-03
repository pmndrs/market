import { Auth } from '@supabase/ui'
import { supabase } from '../helpers/initSupabase'
import Layout from '@/components/layout'
import { useRouter } from 'next/router'

const Index = ({ user, authView }) => {
  const router = useRouter()
  if (user) {
    router.push('/')
  }

  return (
    <Layout title='Sign In' center>
      <div className='m-auto mt-5 max-w-[600px]'>
        <Auth
          className='login-component'
          supabaseClient={supabase}
          providers={['github']}
          view={authView}
          socialButtonSize='xlarge'
        />
      </div>
    </Layout>
  )
}

export default Index
