import Layout from '@/components/layout'
import useStore from '@/helpers/store'

export default function Error() {
  useStore.setState({ title: '404' })
  return (
    <Layout title='OH NO'>
      <h1 className='mt-6 text-black'>404 - Seems you got lost</h1>
    </Layout>
  )
}
