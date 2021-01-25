import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import CookieConsent from "react-cookie-consent";

import Layout from '../components/Layout'
import BannerBottom from '../components/BannerBottom'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>FAB Defense (UK)</title>
        <meta name="description" content="Quality Gun Accessories from FAB Defense!" />
        <meta property="og:title" content="FAB Defense" />
        <meta property="og:description" content="Quality Gun Accessories from FAB Defense!" />
        <meta property="og:image" content="/logos/FAB-logo.png" />
      </Head>
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="fab-cart"
        style={{ background: "#2B373B" }}
        buttonStyle={{ backgroundColor: "#FE0000", color: "#fff", fontSize: "16px", fontWeight: "700", borderRadius: "5px" }}
        expires={150}
      >
        This website uses cookies for functionality and user experience. <Link href="/privacy#cookies"><a><span className="underline">Learn More</span></a></Link>
      </CookieConsent>
      <main className="mx-12 my-12 lg:mx-60 lg:my-0 lg:mt-32 flex justify-center" id="modal">
        <section className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          <Image
            src="/products/FX-AG43B-Black.webp"
            width={250}
            height={250}
            alt="FAB Defense AG43B" />
          {/* <div><img src="products/FX-REGB-White.jpg" alt="" width="250" /></div> */}
          <Image
            src="/products/FX-REGB-White.webp"
            width={250}
            height={250}
            alt="FAB Defense FX REGB Ergonomic Grip" />
          {/* <div><img src="products/FX-GLCOREB-DkGray.jpg" alt="" width="250" /></div> */}
          <Image
            src="/products/FX-GLCOREB-DkGray.webp"
            width={250}
            height={250}
            alt="FAB Defense GL Core B Buttstock" />
          {/* <div><img src="products/FX-TPODG2B-Black.jpg" alt="" width="250" /></div> */}
          <Image
            src="/products/FX-TPODG2B-Black.webp"
            width={250}
            height={250}
            alt="FAB Defense FX TPOD Bipod" />
          {/* <div><img src="products/FX-GLCORES-DkGray.jpg" alt="" width="250" /></div> */}
          <Image
            src="/products/FX-GLCORES-DkGray.webp"
            width={250}
            height={250}
            alt="FAB Defense GLCORE S Buttstock" />
          {/* <div><img src="products/FX-USM-Red.jpg" alt="" width="250" /></div> */}
          <Image
            src="/products/FX-USM-Red.webp"
            width={250}
            height={250}
            alt="FAB Defense USM" />
        </section>
      </main>
      <div className="hidden lg:flex lg:my-40">
        <BannerBottom />
      </div>
    </Layout>
  )
}