import Link from 'next/link'
import Head from 'next/head'

import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'

import { getItem, getItems, getMatrixItem } from '../api/lightspeed'

import Layout from '../../components/Layout'
import MatrixFilter from '../../components/product/MatrixFilter'
import ProductImage from '../../components/product/ProductImage'

export async function getStaticPaths() {
  const res = await getItems()
  const items = await res.data.Item
  let IDs = []

  items.map(item => {
    if (item.manufacturerID === '55' && item.itemMatrixID != '0') {
      IDs.push(item.itemMatrixID)
    }

    if (item.itemMatrixID === '0') {
      IDs.push(item.itemID)
    }
  })

  const paths = IDs.map(id => ({
    params: { id }
  }))

  // const paths = []
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const { id } = params
  let Item

  // Get Item using ID and check if it is a FAB Item, Matrix or Single Item
  const res = await getItem(id)
  Item = await res.data.Item

  if (Item.manufacturerID === '55' && Item.itemMatrixID != '0') {
    const res = await getMatrixItem(id)
    Item = await res.data.ItemMatrix
  }

  if (Item.manufacturerID != '55') {
    const res = await getMatrixItem(id)
    Item = await res.data.ItemMatrix
  }

  return {
    props: { Item, params },
    revalidate: 10
  }
}

const Product = (props) => {
  // Get product id and matrix=true/false from router.
  const router = useRouter()
  const { id, matrix } = router.query
  const { Item, params } = props
  console.log(router)
  // Set const for useRef to prevent useEffect on page load where needed.
  const loaded = useRef(false);

  // Add the shopping cart utilities
  const { addItem, cartCount } = useShoppingCart()

  // State items
  const [item, setItem] = useState()
  const [image, setImage] = useState()
  const [checkedInputs, setCheckedInputs] = useState({})
  const [matrixItemDetail, setMatrixItemDetail] = useState()
  const [matrixLoading, setMatrixLoading] = useState(false)

  // Set Item || MatrixItem on Load
  useEffect(() => {
    setImage(`${Item.Images.Image.baseImageURL}/w_300/${Item.Images.Image.publicID}.jpg`)
    setItem(Item)
  }, [])

  // Log product to console when added to state
  useEffect(() => {
    // console.log({ item })
  }, [item])

  // Get Matrix Item on checkedInputs change.
  useEffect(() => {
    async function getFabItem() {
      setMatrixLoading(true)
      const res = await fetch(`/api/item?itemID=${checkedInputs}`)
      const { Item } = await res.json()
      setImage(Item.Images ? `${Item.Images.Image.baseImageURL}/w_300/${Item.Images.Image.publicID}.jpg` : "/loading.gif")
      setMatrixItemDetail(Item)
      setMatrixLoading(false)
    }
    if (loaded.current) {
      getFabItem()
    } else {
      loaded.current = true;
    }
  }, [checkedInputs])

  useEffect(() => {
    // console.log(matrixLoading)
  }, [matrixLoading])

  // Handle matrix input
  const handleInputChange = (event) => {
    setCheckedInputs([event.target.value])
  }

  if (!item) {
    return (
      <Layout>
        <div className="mt-24 flex justify-center">
          Loading..
      </div>
      </Layout>
    )
  }

  const product = {
    name: item.description,
    description: item.ItemECommerce ? item.ItemECommerce.longDescription : '',
    shortDescription: item.ItemECommerce ? item.ItemECommerce.shortDescription : '',
    sku: item.customSku,
    price: item.Prices.ItemPrice[0].amount.replace('.', ''),
    currency: 'GBP',
    image: image,
    itemID: item.itemID,
    unitPrice: item.Prices.ItemPrice[0].amount,
  }

  function getSingleProductFromMatrix(id) {
    const result = item.Items.Item.filter(obj => obj.itemID == id)
    return {
      name: result[0].description,
      description: result[0].ItemECommerce ? result[0].ItemECommerce.longDescription : '',
      shortDescription: result[0].ItemECommerce ? result[0].ItemECommerce.shortDescription : '',
      sku: result[0].customSku,
      price: result[0].Prices.ItemPrice[0].amount.replace('.', ''),
      currency: 'GBP',
      image: image,
      itemID: result[0].itemID,
      unitPrice: result[0].Prices.ItemPrice[0].amount,
    }
  }

  // Return Matrix Item
  if (item.itemMatrixID != 0) {
    return (
      <Layout>
        <Head>
          <title className="uppercase">{`${item.description} | FAB Defense (UK)`}</title>
          <meta name="description" content={item.description}></meta>
          <meta name="robots" content="index, follow"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <meta name="keywords" content={`fab defense, ${item.description.replace(' ', ',')}`}></meta>
          <meta property="og:title" content={`${item.description}`}></meta>
          <meta property="og:description" content={item.description}></meta>
          <meta property="og:image" content={`${Item.Images.Image.baseImageURL}/w_300/${Item.Images.Image.publicID}.jpg`} alt={`${item.description}`}></meta>
          <meta property="og:url" content="https://fabdefense.co.uk"></meta>
          <meta name="twitter:card" content="summary_large_image"></meta>
          <meta charSet="UTF-8"></meta>
        </Head>
        <div className="divide-y-4 divide-black divide-double">
          <div className="mx-8 my-12 lg:my-20 lg:mx-60">
            <div className="lg:grid lg:grid-cols-2 lg:gap-2">
              <div className="flex justify-center h-full w-full object-cover">
                {matrixLoading &&
                  <img src="/loading.gif" alt="Loading spinner" />
                }
                {!matrixLoading &&
                  <ProductImage imageURL={image} />
                }
              </div>
              <div>
                <h1 className="font-black text-3xl uppercase">{product.name}</h1>
                <p className="my-4 font-black text-3xl uppercase mb-2">{formatCurrencyString({
                  value: product.price,
                  currency: product.currency,
                })}</p>
                <div className="my-4 font-medium" dangerouslySetInnerHTML={{ __html: product.shortDescription }}></div>
                {matrixItemDetail &&
                  <p><span className="font-medium">SKU: {matrixItemDetail.customSku}</span></p>
                }
                {matrixItemDetail && matrixItemDetail.ItemShops.ItemShop[0].qoh > 0 &&
                  <p><span className="font-medium">STOCK:</span> <span className="text-green-500 font-medium uppercase">Available</span></p>
                }
                {matrixItemDetail && matrixItemDetail.ItemShops.ItemShop[0].qoh == 0 &&
                  <p><span className="font-medium">STOCK:</span> <span className="text-red-500 font-medium uppercase">Out of Stock</span></p>
                }
                <MatrixFilter item={item} handleInputChange={handleInputChange} checkedInputs={checkedInputs} />
                <div className="mt-8">
                  {matrixItemDetail && matrixItemDetail.ItemShops.ItemShop[0].qoh > 0 &&
                    <button
                      onClick={() => addItem(getSingleProductFromMatrix(checkedInputs))}
                      aria-label={`Add ${product.name} to your cart`}
                      className="p-3 bg-fabred focus:bg-red-400 text-white font-bold rounded mr-2"
                    >
                      Add to Cart
                </button>
                  }
                  {matrixItemDetail && matrixItemDetail.ItemShops.ItemShop[0].qoh == 0 &&
                    <button
                      onClick={() => addItem(getSingleProductFromMatrix(checkedInputs))}
                      aria-label={`Add ${product.name} to your cart`}
                      className="p-3 bg-fabgrey text-gray-400 font-bold rounded mr-2"
                      disabled
                    >
                      Add to Cart
                </button>
                  }
                  {cartCount > 0 ? (
                    <Link href="/cart">
                      <button className="p-3 bg-fabred text-white font-bold rounded">View Cart</button>
                    </Link>
                  ) : ''}
                </div>
              </div>
            </div>
          </div>
          <div className="mx-8 lg:mx-60 lg:my-20">
            <h3 className="my-12 lg:mx-4 lg:my-12 text-2xl font-black">DESCRIPTION</h3>
            <section>
              <div className="lg:mx-4 my-4 prose font-medium" dangerouslySetInnerHTML={{ __html: product.description }}></div>
            </section>
          </div>
        </div>
      </Layout>
    )
  }

  // Return Single Item
  if (item.itemMatrixID == 0) {
    return (
      <Layout>
        <Head>
          <title className="uppercase">{`${item.description} | FAB Defense (UK)`}</title>
          <meta name="description" content={item.description}></meta>
          <meta name="robots" content="index, follow"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <meta name="keywords" content={`fab defense, ${item.description.replace(' ', ',')}`}></meta>
          <meta property="og:title" content={`${item.description}`}></meta>
          <meta property="og:description" content={item.description}></meta>
          <meta property="og:image" content={`${Item.Images.Image.baseImageURL}/w_300/${Item.Images.Image.publicID}.jpg`} alt={`${item.description}`}></meta>
          <meta property="og:url" content="https://fabdefense.co.uk"></meta>
          <meta name="twitter:card" content="summary_large_image"></meta>
          <meta charSet="UTF-8"></meta>
        </Head>
        <div className="divide-y-4 divide-black divide-double">
          <div className="mx-8 my-12 lg:my-20 lg:mx-60">
            <div className="lg:grid lg:grid-cols-2 lg:gap-1">
              <div className="flex justify-center">
                <ProductImage imageURL={image} />
              </div>
              <div>
                <h1 className="font-black text-3xl uppercase">{product.name}</h1>
                <p className="my-4 font-black text-3xl uppercase mb-2">{formatCurrencyString({
                  value: product.price,
                  currency: product.currency,
                })}</p>
                <div className="my-4 font-medium" dangerouslySetInnerHTML={{ __html: product.shortDescription }}></div>
                <p><span className="font-medium">SKU:</span>{product.sku}</p>
                {item.ItemShops.ItemShop[0].qoh > 0 &&
                  (<p><span className="font-medium">STOCK:</span> <span className="text-green-500 font-medium uppercase">Available</span></p>)
                }
                {item.ItemShops.ItemShop[0].qoh == 0 &&
                  (<p><span className="font-medium">STOCK:</span> <span className="text-red-500 font-medium uppercase">Out of Stock</span></p>)
                }
                <div className="mt-8">
                  {item.ItemShops.ItemShop[0].qoh > 0 &&
                    <button
                      onClick={() => addItem(product)}
                      aria-label={`Add ${product.name} to your cart`}
                      className="p-3 bg-fabred focus:bg-red-400 text-white font-bold rounded mr-2"
                    >
                      Add to Cart
                </button>
                  }
                  {item.ItemShops.ItemShop[0].qoh == 0 &&
                    <button
                      onClick={() => addItem(product)}
                      aria-label={`Add ${product.name} to your cart`}
                      className="p-3 bg-fabgrey text-gray-400 font-bold rounded mr-2"
                      disabled
                    >
                      Add to Cart
                </button>
                  }
                  {cartCount > 0 ? (
                    <Link href="/cart">
                      <button className="p-3 bg-fabred text-white font-bold rounded">View Cart</button>
                    </Link>
                  ) : ''}
                </div>
              </div>
            </div>
          </div>
          <div className="mx-8 my-8 lg:mx-60 lg:my-20">
            <h3 className="mt-8 lg:mb-2 text-2xl font-black">DESCRIPTION</h3>
            <section>
              <div className="my-4 prose font-medium" dangerouslySetInnerHTML={{ __html: product.description }}></div>
            </section>
          </div>
        </div>
      </Layout >
    )
  }
}

export default Product
