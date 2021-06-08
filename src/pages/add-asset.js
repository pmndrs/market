import Layout from '@/components/layout/'
import AddAsset from '@/components/AddAsset/'
import useStore from '@/helpers/store'

const Page = () => {
  const user = useStore()

  if (!user) return null
  return (
    <Layout title={'Add your own asset'} center>
      <AddAsset />
    </Layout>
  )
}

export default Page
