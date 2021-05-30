import * as Fathom from 'fathom-client'
import { useRouter } from 'next/router'
import { useEffect } from 'react/'

const useFathom = () => {
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
}

export default useFathom
