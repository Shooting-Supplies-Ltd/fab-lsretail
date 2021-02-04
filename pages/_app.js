import Router from 'next/router';
import withYM from "next-ym";
import { CartProvider } from 'use-shopping-cart'
import { loadStripe } from '@stripe/stripe-js'
import NProgress from 'nprogress';

import '../style/nprogress.css';
import '../style/index.css'
require("typeface-montserrat");

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
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default withYM("71925202", Router)(MyApp);