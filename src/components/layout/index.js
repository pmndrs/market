import useStore from '@/helpers/store'
import Head from 'next/head'
import Footer from './footer'
import Nav from './nav'

const Header = () => {
  const title = useStore((s) => s.title)
  return (
    <Head>
      <title>pmndrs market - {title}</title>
    </Head>
  )
}

const Layout = ({ children, title, center }) => {
  const events = useStore((s) => s.events)

  return (
    <>
      <Header />
      <div className='bg-white children'>
        <Nav />

        <div className='py-10'>
          <header>
            <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
              <h1
                className={`text-3xl font-bold leading-tight text-gray-900 ${
                  center ? 'text-center' : ''
                }`}
              >
                {title || 'All Models'}
              </h1>
            </div>
          </header>
          <main>
            <div
              className='relative px-6 mx-auto max-w-7xl lg:px-8'
              {...events}
            >
              {children}
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Layout
