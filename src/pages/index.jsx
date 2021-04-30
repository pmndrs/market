import useStore from '@/helpers/store'
import getAllModels from '@/helpers/getAllModels'
import Model from '@/components/Model'
import Layout from '@/components/layout/'

const Page = ({ title, models }) => {
  useStore.setState({ title })
  return (
    <Layout>
      <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {models.map((model) => (
          <Model {...model} key={model.gltf} />
        ))}
      </ul>
    </Layout>
  )
}

export default Page
// This function gets called at build time on server-side.
// It won't be called on client-side.
export async function getStaticProps() {
  const models = getAllModels()

  return {
    props: {
      models,
      title: 'Models',
    },
  }
}
