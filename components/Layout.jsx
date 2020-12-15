import Nav from './Nav'
import Footer from './Footer'
import Head from 'next/head'

const Layout = (props) => {
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <link rel="icon" href="/logos/FAB-logo.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Nav />
      <div className="p-2 flex justify-center text-white bg-fabgrey">
        <p>Free Delivery on Orders over £50</p>
      </div>
      <div className="flex-grow">
        {props.children}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout