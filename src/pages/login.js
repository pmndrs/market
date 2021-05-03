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
    <Layout>
      <div className='max-w-[600px]'>
        <Auth
          supabaseClient={supabase}
          providers={['github']}
          view={authView}
          socialLayout='horizontal'
          socialButtonSize='xlarge'
        />
      </div>
    </Layout>
  )
}

export default Index
