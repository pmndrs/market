import '@/styles/index.css'
import 'tippy.js/dist/tippy.css' // optional
import { useState, useEffect } from 'react'
import { supabase } from '../helpers/initSupabase'
import useStore from '@/helpers/store'

function MyApp({ Component, pageProps }) {
  const user = supabase.auth.user()
  const session = supabase.auth.session()

  useEffect(() => {
    useStore.setState({ user })
  }, [user])

  const [authView, setAuthView] = useState('sign_in')
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'PASSWORD_RECOVERY') setAuthView('forgotten_password')
        if (event === 'USER_UPDATED')
          setTimeout(() => setAuthView('sign_in'), 1000)
        if (session) {
          useStore.setState({ user: session?.user })
        } else {
          useStore.setState({ user: null })
        }

        fetch('/api/auth', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json())

        if (event === 'SIGNED_IN') {
          const { user } = session
          const { data } = await supabase
            .from('profiles')
            .select('user_id')
            .eq('user_id', user.id)

          if (!data.length) {
            await supabase.from('profiles').insert([
              {
                user_id: user.id,
                name: user.user_metadata.full_name || user.email,
                avatar: user.user_metadata.avatar_url,
              },
            ])
          }
        }
      }
    )

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  return (
    <Component
      user={user}
      session={session}
      authView={authView}
      {...pageProps}
    />
  )
}
export default MyApp
