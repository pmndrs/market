import '@/styles/index.css'
import 'tippy.js/dist/tippy.css' // optional
import { useState, useEffect } from 'react'
import { supabase } from '../helpers/initSupabase'
import useStore from '@/helpers/store'
import * as Fathom from 'fathom-client'
import { useRouter } from 'next/router'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  const user = supabase.auth.user()
  const session = supabase.auth.session()
  const router = useRouter()

  useEffect(() => {
    Fathom.load('JKSIZFZI')

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])

  const fetchUserProfile = async (id) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', id)

    return data[0]
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [setUser, user])

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
    <>
      <Head>
        <link rel='amphtml' href={'https://market.pmnd.rs' + router.asPath} />
        <link rel='canonical' href={'https://market.pmnd.rs' + router.asPath} />
        <meta name='googlebot' content='follow, index, noarchive' />
        <meta name='robots' content='follow, index, noarchive' />
        <meta name='viewport' content='initial-scale=1,width=device-width' />

        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />

        <link rel='manifest' href='/site.webmanifest' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='#000000' />
        <meta name='apple-mobile-web-app-title' content='PMNDRS Market' />
        <meta name='application-name' content='PMNDRS Market' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-config' content='/browserconfig.xml' />
        <meta name='msapplication-navbutton-color' content='#000000' />
        <meta name='msapplication-starturl' content='https://market.pmnd.rs/' />
        <meta name='msapplication-tilecolor' content='#000000' />
        <meta name='msapplication-tileimage' content='/mstile-144x144.png' />
        <meta name='msapplication-tooltip' content='PMNDRS Market' />
        <meta name='title' content='pmndrs market' />
        <meta
          name='description'
          content="Your home for downloading web-ready 3D assets. Download CC0 models, textures and HDRI's that are web-ready."
        />

        <meta property='og:type' content='website' />
        <meta property='og:url' content='http://market.pmnd.rs/' />
        <meta property='og:title' content='pmndrs market' />
        <meta
          property='og:description'
          content="Your home for downloading web-ready 3D assets. Download CC0 models, textures and HDRI's that are web-ready."
        />
        <meta property='og:image' content='http://market.pmnd.rs/share.png' />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='http://market.pmnd.rs/' />
        <meta property='twitter:title' content='pmndrs market' />
        <meta
          property='twitter:description'
          content="Your home for downloading web-ready 3D assets. Download CC0 models, textures and HDRI's that are web-ready."
        />
        <meta
          property='twitter:image'
          content='http://market.pmnd.rs/share.png'
        />
      </Head>

      <Component
        user={user}
        session={session}
        authView={authView}
        {...pageProps}
      />
    </>
  )
}
export default MyApp
