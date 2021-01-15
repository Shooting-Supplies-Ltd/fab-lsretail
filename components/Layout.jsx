import Nav from './Nav'
import Footer from './Footer'
import Head from 'next/head'

const Layout = (props) => {
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <link rel="icon" href="/logos/FAB-logo.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script async src="https://ackee-k395.onrender.com/tracker.js" data-ackee-server="https://ackee-k395.onrender.com" data-ackee-domain-id="7a72aa2e-cdae-459d-92e6-4da4c37fc5e7"></script>
      </Head>
      <Nav />
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