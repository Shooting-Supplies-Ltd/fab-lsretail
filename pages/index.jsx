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
        <title className="uppercase">FAB Defense (UK)</title>
        <meta name="description" content="High Quality Gun Accessories | Buttstocks | Pistol Grips & More"></meta>
        <meta name="robots" content="index, follow"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="keywords" content="fab defense, buttstocks, grips, gun accessories, rifle accessories, pistol accessories, hand guards"></meta>
        <meta property="og:title" content="FAB Defense (UK) Ltd"></meta>
        <meta property="og:description" content="High Quality Gun Accessories | Buttstocks | Pistol Grips & More"></meta>
        <meta property="og:image" content="/logos/FAB-logo.webp" alt="FAB Defense | Expect More"></meta>
        <meta property="og:url" content="https://fabdefense.co.uk"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta charSet="UTF-8"></meta>
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
          <Image
            src="/products/FX-REGB-White.webp"
            width={250}
            height={250}
            alt="FAB Defense FX REGB Ergonomic Grip" />
          <Image
            src="/products/FX-GLCOREB-DkGray.webp"
            width={250}
            height={250}
            alt="FAB Defense GL Core B Buttstock" />
          <Image
            src="/products/FX-TPODG2B-Black.webp"
            width={250}
            height={250}
            alt="FAB Defense FX TPOD Bipod" />
          <Image
            src="/products/FX-GLCORES-DkGray.webp"
            width={250}
            height={250}
            alt="FAB Defense GLCORE S Buttstock" />
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