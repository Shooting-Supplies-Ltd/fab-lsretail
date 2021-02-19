import Layout from '../../components/Layout'
import Head from 'next/head'

const Blog = () => {
  return (
    <Layout>
      <Head>
        <title>Blog - FAB Defense (UK)</title>
        <meta name="description" content="Welcome to the FAB Defense (UK) blog. Check back for the latest news and updates for FAB Defense products." />
      </Head>
      <main className="mx-8 mt-8 lg:flex lg:justify-center lg:items-center lg:mt-12">
        No posts yet, check back later for the latest updates.
      </main>
    </Layout>
  )
}

export default Blog