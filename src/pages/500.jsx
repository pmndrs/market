import Layout from '@/components/layout'
import useStore from '@/helpers/store'

export default function Error() {
  useStore.setState({ title: 'Bad error' })
  return (
    <Layout title='OH NO'>
      <h1 className='mt-6'>500 - Something went wrong</h1>
    </Layout>
  )
}
