import '@/styles/index.css'
import 'tippy.js/dist/tippy.css' // optional
import { useEffect } from 'react'
import { supabase } from '../helpers/initSupabase'
import { useRouter } from 'next/router'
import Head from 'next/head'
import ProgressBar from '@badrap/bar-of-progress'
import useHandleLogin from '@/helpers/hooks/useHandleLogin'
import useFathom from '@/helpers/hooks/useFathom'
import { Toaster } from 'react-hot-toast'
import useStore from '@/helpers/store'

function getInitialColorMode() {
  const persistedColorPreference = window.localStorage.getItem('nightwind-mode')
  const hasPersistedPreference = typeof persistedColorPreference === 'string'
  if (hasPersistedPreference) {
    return persistedColorPreference
  }
  return 'light'
}

const progress = new ProgressBar({
  size: 3,
  color: '#2e298b',
  delay: 100,
  className: 'progress',
})

function MyApp({ Component, pageProps }) {
  const user = supabase.auth.user()
  const session = supabase.auth.session()
  const router = useRouter()
  useHandleLogin()
  useFathom()

  useEffect(() => {
    router.events.on('routeChangeStart', progress.start)
    router.events.on('routeChangeComplete', progress.finish)
    router.events.on('routeChangeError', progress.finish)
  }, [router.events])

  useEffect(() => {
    getInitialColorMode() === 'light'
      ? document.documentElement.classList.remove('dark')
      : document.documentElement.classList.add('dark')
    document.documentElement.classList.add('nightwind')
    useStore.setState({ darkMode: getInitialColorMode() === 'dark' })
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
      <Component user={user} session={session} {...pageProps} />
      <Toaster />
    </>
  )
}
export default MyApp
