import Router from 'next/router';
import { CartProvider } from 'use-shopping-cart'
import { loadStripe } from '@stripe/stripe-js'
import { DefaultSeo } from 'next-seo'
import NProgress from 'nprogress';

import '../style/nprogress.css';
import '../style/index.css'
require("typeface-montserrat");

import SEO from '../next-seo.config'

// Router events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const stripePromise = loadStripe(process.env.STRIPE_API_PUBLIC_KEY)

  return (
    <CartProvider
      stripe={stripePromise}
      mode="checkout-session"
      successUrl="stripe.com"
      cancelUrl="/"
      currency="GBP"
      allowedCountries={['GB']}
      billingAddressCollection={true}
    >
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp