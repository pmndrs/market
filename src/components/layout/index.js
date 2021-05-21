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

const Layout = ({ children, title, center, noTitle }) => {
  const events = useStore((s) => s.events)

  return (
    <>
      <Header />
      <div className='flex flex-col min-h-screen bg-white children'>
        <Nav />

        <main className='flex-1 py-10'>
          <header>
            {!noTitle && (
              <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
                <h1
                  className={`text-3xl font-bold leading-tight text-gray-900 ${
                    center ? 'text-center' : ''
                  }`}
                >
                  {title || 'All Models'}
                </h1>
              </div>
            )}
          </header>
          <main>
            <div
              className='relative px-6 mx-auto max-w-7xl lg:px-8'
              {...events}
            >
              {children}
            </div>
          </main>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
