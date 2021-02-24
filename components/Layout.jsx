import Nav from './Nav'
import Footer from './Footer'
import Head from 'next/head';

const Layout = (props) => {
  const { children } = props

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon/favicon-16x16.png" />
        <link rel="manifest" href="/icon/site.webmanifest" />
        <link rel="mask-icon" href="/icon/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/icon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#b91d47" />
        <meta name="msapplication-config" content="/icon/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Nav />
      <div className="flex-grow">
        {children}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout