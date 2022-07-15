import Layout from '@/components/layout/'
import AddAsset from '@/components/AddAsset/'
import useStore from '@/helpers/store'
import Head from 'next/head'
import Script from 'next/script'

const Page = () => {
  const { user } = useStore()

  if (!user) return null
  return (
    <Layout title={'Add your own asset'} center>
      <AddAsset />
      <Head>
        <Script strategy='beforeInteractive' src='/draco/decoder.js' />
      </Head>
    </Layout>
  )
}

export default Page
