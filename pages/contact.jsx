import Layout from '../components/Layout'
import Head from 'next/head'

const Contact = () => {
  return (
    <Layout>
      <Head>
        <title>Contact Us - FAB Defense (UK)</title>
      </Head>
      <main className="mx-8 my-8 lg:my-12 lg:mx-96 lg:px-40">
        <h2 className="mb-1 lg:mb-4 font-bold lg:text-2xl">Contact Us</h2>
        <p className="text-sm lg:text-base hover:text-fabred">Tel: <a href="tel:01527831261">01527831261</a></p>
        <p className="text-sm lg:text-base hover:text-fabred">Email: <a href="mailto:info@shootingsuppliesltd.co.uk">info@shootingsuppliesltd.co.uk</a></p>
        <p className="text-sm lg:text-base">Address: 38, Sherwood Road, Bromsgrove, B60 3DR</p>
        <hr className="my-4" />
        <h3 className="mb-1 lg:mb-4 font-bold lg:text-2xl">Opening Times</h3>
        <p className="text-sm lg:text-base">Mon: Closed</p>
        <p className="text-sm lg:text-base">Tue: 09:00 - 17:30</p>
        <p className="text-sm lg:text-base">Wed: 09:00 - 17:30</p>
        <p className="text-sm lg:text-base">Thu: 09:00 - 17:30</p>
        <p className="text-sm lg:text-base">Fri: 09:00 - 19:00</p>
        <p className="text-sm lg:text-base">Sat: 09:00 - 17:30</p>
        <p className="text-sm lg:text-base">Sun: Closed</p>
      </main>
    </Layout>
  )
}

export default Contact