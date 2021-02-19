import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import PrintObject from '../components/PrintObject'
import { createSale } from '../pages/api/lightspeed'
import { useShoppingCart } from 'use-shopping-cart'
import { parseCookies, destroyCookie } from 'nookies'
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
            "paymentTypeID": 1
          }
        }
      }

      await createSale(sale).then(res => {
        saleID = res.data.Sale.saleID
      })
    }
  }



  const sendEmailConfirmation = async () => {
    const emailLineItems = stripeSessionData.line_items.data.map(line => {
      return (
        `<p><strong>Description:</strong> ${line.description} - <strong>Qty:</strong> ${line.quantity}</p>`
      )
    })

    try {
      const res = fetch('https://api.sendinblue.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': process.env.EMAIL_API,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": "FAB Order",
          "to": [{ "name": "Antony", "email": "info@shootingsuppliesltd.co.uk" }, { "name": "Darryl", "email": "darryl@shootingsuppliesltd.co.uk" }],
          "sender": { "name": "FAB Defense", "email": "noreply@fabdefense.co.uk" },
          "subject": "New FAB Web Order",
          "htmlContent":
            `<html>
              <body style="background-color: black; color: white;">
                <h1>You Have Received a New Order</h1>
                <h3>Order Detail</h3>
                <p><strong>Sale ID:</strong><span>${saleID}</span></p>
                <p><strong>Customer Email:</strong><span>${stripeSessionData.payment_intent.charges.data[0].billing_details.email}</span></p>
                <p><strong>Order Items:</strong><span>${emailLineItems}</span></p>
                <address>
                <p><strong>Delivery Address</strong></p>
                <p>${stripeSessionData.shipping.address.line1}</p>
                <p>${stripeSessionData.shipping.address.line2}</p>
                <p>${stripeSessionData.shipping.address.city}</p>
                <p>${stripeSessionData.shipping.address.postal_code}</p>
                </address>
              </body>
            </html>`
        })
      })
    } catch (err) {
      if (err) console.log(err)
    }
  }

  sendEmailConfirmation()

  return {
    props: {
      data: stripeSessionData,
      saleID: saleID
    }
  }
}


export default ResultPage
