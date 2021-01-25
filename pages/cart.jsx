import React, { useState, useEffect } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import { fetchPostJSON } from './api/api-helpers'
import CartItems from '../components/cart/CartItems'
import { setCookie, destroyCookie } from 'nookies'
import Layout from '../components/Layout'
import Head from 'next/head'
import { RewindDimensions } from '@styled-icons/boxicons-regular/Rewind'

const Cart = () => {
  const [loading, setLoading] = useState(false)
  const [cartEmpty, setCartEmpty] = useState(true)
  const [delivery, setDelivery] = useState(undefined)

  const {
    addItem,
    removeItem,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
    totalPrice,
    formattedTotalPrice,
  } = useShoppingCart()

  useEffect(() => {
    const getDeliveryItem = async () => {
      setLoading(true)
      if (totalPrice && totalPrice < 5000 && delivery === undefined) {
        const res = await fetch('/api/delivery')
        const data = await res.json()
        const item = data.Item

        const delivery = {
          name: item.description,
          description: 'Delivery',
          shortDescription: 'Delivery',
          sku: item.customSku,
          price: item.Prices.ItemPrice[0].amount.replace('.', ''),
          currency: 'GBP',
          image: `${item.Images.Image.baseImageURL}/w_200/${item.Images.Image.publicID}.jpg`,
          itemID: item.itemID,
          unitPrice: item.Prices.ItemPrice[0].amount,
        }
        setDelivery(delivery)
      }
      setLoading(false)
    }
    getDeliveryItem()
  })

  useEffect(() => {
    // console.log(loading)
  }, [loading])

  useEffect(() => setCartEmpty(!cartCount), [cartCount])
  useEffect(() => {
    if (delivery && cartCount > 0) {
      if (!cartDetails['DEL-FAB']) {
        addItem(delivery)
      }
    }
  }, [delivery])

  useEffect(() => {
    if (totalPrice >= 5000) {
      setDelivery(undefined)
      removeItem('DEL-FAB')
    }
  }, [totalPrice])

  useEffect(() => {
    if (Object.keys(cartDetails).length === 1 && cartDetails['DEL-FAB']) {
      setDelivery(undefined)
      removeItem('DEL-FAB')
    }
  }, [cartDetails])

  const clearCookie = () => {
    destroyCookie(null, 'cart')
    clearCart()
  }

  const handleCheckout = async (event) => {
    event.preventDefault()
    setCookie(null, 'cart', JSON.stringify({ cartDetails, formattedTotalPrice }), { path: '/' })

    const response = await fetchPostJSON(
      '/api/checkout_sessions/cart',
      cartDetails
    )

    if (response.statusCode === 500) {
      console.error(response.message)
      return
    }
    redirectToCheckout({ sessionId: response.id })
  }

  // if (cartCount === 0) {
  //   return (
  //     <Layout>
  //       <div className="flex justify-center my-12 text-xl uppercase">The Cart is Empty</div>
  //     </Layout>
  //   )
  // }

  return (
    <Layout>
      <Head>
        <title>Cart - FAB Defense (UK)</title>
      </Head>
      <div className="mx-8 my-8 lg:mx-60 lg:my-12">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 lg:overflow-x-auto">
          <div className="lg:inline-block lg:min-w-full lg:shadow lg:rounded lg:overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead className="bg-black text-white">
                <tr>
                  <th className="p-2 lg:px-5 lg:py-3 lg:border-b-2 lg:border-gray-200 lg:bg-black lg:text-left lg:text-xs lg:font-semibold lg:text-white lg:uppercase lg:tracking-wider"></th>
                  <th className="lg:px-5 lg:py-3 lg:border-b-2 lg:border-gray-200 lg:bg-black lg:text-left lg:text-xs lg:font-semibold lg:text-white lg:uppercase lg:tracking-wider"></th>
                  <th className="p-2 text-left lg:px-5 lg:py-3 lg:border-b-2 lg:border-gray-200 lg:bg-black lg:text-left text-sm lg:font-semibold lg:text-white lg:uppercase lg:tracking-wider">Description</th>
                  <th className="p-2 text-left lg:border-b-2 lg:border-gray-200 lg:bg-black lg:text-left text-sm lg:font-semibold lg:text-white lg:uppercase lg:tracking-wider">Qty</th>
                  <th className="p-2 text-left lg:px-5 lg:py-3 lg:border-b-2 lg:border-gray-200 lg:bg-black lg:text-left text-sm lg:font-semibold lg:text-white lg:uppercase lg:tracking-wider">Price</th>
                </tr>
              </thead>
              <tbody>
                <CartItems cartDetails={cartDetails} />
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="w-24 lg:w-48 flex flex-col border-2 border-gray-200 text-center">
            <div className="p-1 lg:p-2 bg-black text-white text-sm lg:text-base rounded-t">
              <h3>Cart Total</h3>
            </div>
            <div className="p-2 text-center text-sm lg:text-base">
              <p>{formattedTotalPrice}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={clearCookie} className="mt-4 bg-black text-white text-sm lg:text-base rounded p-3">Clear Cart</button>
          {!loading &&
            <button onClick={handleCheckout} className="ml-4 mt-4 bg-green-500 focus:bg-fabgrey text-white text-sm lg:text-base rounded p-3">Pay Now</button>
          }

        </div>
      </div>
    </Layout>
  )
}

export default Cart