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
      (event, session) => {
        if (event === 'PASSWORD_RECOVERY') setAuthView('forgotten_password')
        if (event === 'USER_UPDATED')
          setTimeout(() => setAuthView('sign_in'), 1000)
        if (session) {
          useStore.setState({ user: session?.user })
        } else {
          useStore.setState({ user: null })
        }
      }
    )

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  return (
    <Component
      {...pageProps}
      user={user}
      session={session}
      authView={authView}
    />
  )
}
export default MyApp
