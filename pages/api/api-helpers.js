import { getDelivery, getItems } from './lightspeed'

export async function fetchGetJSON(url) {
  try {
    const data = await fetch(url).then((res) => res.json())
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function fetchPostJSON(url, data) {
  try {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data || {}), // body data type must match "Content-Type" header
    })
    return await response.json() // parses JSON response into native JavaScript objects
  } catch (err) {
    console.log(err)
    throw new Error(err.message)
  }
}

export async function getInventory() {
  const res = await getItems()
  const data = await res.data

  const items = data.Item

  const resDel = await getDelivery()
  const dataDel = await resDel.data
  items.push(dataDel.Item)

  const products = items.map(item => {
    return (
      {
        "name": item.description,
        "sku": item.customSku,
        "price": item.Prices.ItemPrice[0].amount.replace('.', ''),
        "image": item.Images ? `${item.Images.Image.baseImageURL}/w_250/${item.Images.Image.publicID}.jpg` : null,
        "currency": 'GBP'
      }
    )
  })
  return products
}

export async function sendEmailConfirmation(stripeSessionData, saleID) {
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
              <p><strong>Stripe Sale ID:</strong><span>${stripeSessionData.payment_intent.id}</span></p>
              <p><strong>Customer Name:</strong><span>${stripeSessionData.payment_intent.charges.data[0].billing_details.name}</span></p>
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
    }).catch(err => console.error(err))
  } catch (err) {
    if (err) console.log(err)
  }
}