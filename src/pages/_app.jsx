import '@/styles/index.css'
import 'tippy.js/dist/tippy.css' // optional
import { useState, useEffect } from 'react'
import { supabase } from '../helpers/initSupabase'
import useStore from '@/helpers/store'
import * as Fathom from 'fathom-client'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const user = supabase.auth.user()
  const session = supabase.auth.session()
  const router = useRouter()

  useEffect(() => {
    // Initialize Fathom when the app loads
    // Example: yourdomain.com
    //  - Do not include https://
    //  - This must be an exact match of your domain.
    //  - If you're using www. for your domain, make sure you include that here.
    Fathom.load('YOUR_FATHOM_TRACKING_CODE', {
      includedDomains: ['market.pmnd.rs'],
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [])

  const fetchUserProfile = async (id) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', id)

    return data[0]
  }

  const setUser = async () => {
    const profile = await fetchUserProfile(user.id)
    useStore.setState({
      user: {
        ...user,
        profile,
      },
    })
  }

  useEffect(() => {
    if (user) setUser()
  }, [user])

  const [authView, setAuthView] = useState('sign_in')
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'PASSWORD_RECOVERY') setAuthView('forgotten_password')
        if (event === 'USER_UPDATED')
          setTimeout(() => setAuthView('sign_in'), 1000)
        if (session) {
          const profile = await fetchUserProfile(session?.user.id)
          useStore.setState({
            user: {
              ...session?.user,
              profile,
            },
          })
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
            .select('*')
            .eq('user_id', user.id)

          if (!data.length) {
            await supabase.from('profiles').insert([
              {
                user_id: user.id,
                name: user.user_metadata.full_name || user.email,
                avatar: user.user_metadata.avatar_url,
              },
            ])
            useStore.setState({
              user: {
                ...user,
                profile: data[0],
              },
            })
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
