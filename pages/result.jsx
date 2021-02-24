import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { createSale } from '../pages/api/lightspeed'
import { useShoppingCart } from 'use-shopping-cart'
import { parseCookies, destroyCookie } from 'nookies'
import { sendEmailConfirmation } from './api/api-helpers'
import Head from 'next/head'

const ResultPage = (props) => {
  const router = useRouter()
  const { data } = props.props
  const { saleID } = props.props
  const { clearCart } = useShoppingCart()

  if (!props) return <div>failed to load</div>

  destroyCookie(null, 'cart')
  clearCart()

  if (data.payment_status === 'paid') {
    return (
      <Layout>
        <Head>
          <title>Checkout Result - FAB Defense (UK)</title>
        </Head>
        <div className="lg:mx-96 lg:my-12">
          <h1 className="text-4xl font-bold">Thankyou for your order!</h1>
          <h2 className="lg:text-2xl lg:mt-4 font-semibold">Your order reference is:  {saleID}</h2>
          <p className="lg:text-xl lg:mt-4">Please allow up to 3 working days for delivery of your item.</p>
          {/* <h2>Status: {data?.payment_intent?.status ?? 'loading...'}</h2> */}
          {/* <h3>CheckoutSession response:</h3>
          <PrintObject content={data ?? 'loading...'} /> */}
        </div>
      </Layout>
    )
  }
}

ResultPage.getInitialProps = async ({ query, req }) => {
  const { session_id } = query
  const { headers } = req
  const parsedCookies = parseCookies({ req })

  const cart = parsedCookies.cart

  const data = await fetch(`http://${headers.host}/api/checkout_sessions/${session_id}`)
  const stripeSessionData = await data.json()
  let saleID = null

  if (cart) {
    if (stripeSessionData.payment_status === 'paid') {
      const parseCartDetails = JSON.parse(cart)
      const cartDetails = parseCartDetails.cartDetails

      const saleLines = Object.keys(cartDetails).map(item => {
        return {
          "SaleLine": [
            {
              "shopID": 1,
              "employeeID": 9,
              "customSku": cartDetails[item].sku,
              "unitQuantity": cartDetails[item].quantity,
              "unitPrice": cartDetails[item].unitPrice,
              "itemID": parseInt(cartDetails[item].itemID)
            }
          ]
        }
      })

      const sale = {
        "employeeID": 9,
        "registerID": 1,
        "completed": true,
        "shopID": 1,
        "referenceNumber": stripeSessionData.payment_intent.id,
        "SaleLines": saleLines.map(item => {
          return item
        }),
        "SalePayments": {
          "SalePayment": {
            "amount": parseFloat(parseCartDetails.formattedTotalPrice.replace('£', '')),
            "paymentTypeID": 9
          }
        }
      }

      await createSale(sale).then(res => {
        saleID = res.data.Sale.saleID
      }).then(sendEmailConfirmation(stripeSessionData, saleID))
    }
  }

  return {
    props: {
      data: stripeSessionData,
      saleID: saleID
    }
  }
}


export default ResultPage
