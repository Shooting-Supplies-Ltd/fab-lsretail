import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'

import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'

import { getItem, getMatrixItem } from '../api/lightspeed'

import Layout from '../../components/Layout'
import MatrixFilter from '../../components/product/MatrixFilter'
import ProductImage from '../../components/product/ProductImage'

const Product = (props) => {
  // Get product id and matrix=true/false from router.
  const router = useRouter()
  const { id, matrix } = router.query
  const { Item, params } = props
  console.log(Item)

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
    // const getMatrixItem = async (id) => {
    //   const res = await fetch(`/api/matrixItem?itemID=${id}`)
    //   const data = await res.json()
    //   const matrixItem = data.ItemMatrix
    //   setImage(matrixItem.Images ? `${matrixItem.Images.Image.baseImageURL}/w_300/${matrixItem.Images.Image.publicID}.jpg` : 'No Image Yet')
    //   setItem(matrixItem)
    // }

    // const getSingleItem = async (id) => {
    //   const res = await fetch(`/api/item?itemID=${id}`)
    //   const data = await res.json()

    //   const singleItem = data.Item
    //   setImage(singleItem.Images ? `${singleItem.Images.Image.baseImageURL}/w_300/${singleItem.Images.Image.publicID}.jpg` : 'No Image Yet')
    //   setItem(singleItem)
    // }

    // if (matrix === "true") {
    //   getMatrixItem(id)
    // }

    // if (matrix === undefined) {
    //   getSingleItem(id)
    // }
  }, [])

  // Get initial product
  // useEffect(() => {
  //   const getMatrixItem = async (id) => {
  //     const res = await fetch(`/api/matrixItem?itemID=${id}`)
  //     const data = await res.json()
  //     const matrixItem = data.ItemMatrix
  //     setImage(matrixItem.Images ? `${matrixItem.Images.Image.baseImageURL}/w_300/${matrixItem.Images.Image.publicID}.jpg` : 'No Image Yet')
  //     setItem(matrixItem)
  //   }

  //   const getSingleItem = async (id) => {
  //     const res = await fetch(`/api/item?itemID=${id}`)
  //     const data = await res.json()

  //     const singleItem = data.Item
  //     setImage(singleItem.Images ? `${singleItem.Images.Image.baseImageURL}/w_300/${singleItem.Images.Image.publicID}.jpg` : 'No Image Yet')
  //     setItem(singleItem)
  //   }

  //   if (matrix === "true") {
  //     getMatrixItem(id)
  //   }

  //   if (matrix === undefined) {
  //     getSingleItem(id)
  //   }
  // }, [])

  // Log product to console when added to state
  useEffect(() => {
    console.log({ item })
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
          <title>{item.description} - FAB Defense (UK)</title>
          <meta name="description" content={item.description} />
          <meta name="og:title" content={item.description} />
          <meta name="og:description" content={product.description} />
          <meta name="og:image" content={product.image} />
        </Head>
        <div>
          <div className="lg:mx-60">
            <button className="ml-2 mt-2 p-2 bg-black text-white text-sm rounded" onClick={() => router.back()}>Back</button>
          </div>
          <div className="mx-8 lg:mt-4 lg:mx-60">
            <div className="lg:grid lg:grid-cols-2 lg:gap-1">

              <div className="flex justify-center">
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
                <div className="lg:my-4 lg:font-medium" dangerouslySetInnerHTML={{ __html: product.shortDescription }}></div>
                {matrixItemDetail &&
                  <p><span className="lg:font-medium">SKU: {matrixItemDetail.customSku}</span></p>
                }
                {matrixItemDetail && matrixItemDetail.ItemShops.ItemShop[0].qoh > 0 &&
                  <p><span className="lg:font-medium">STOCK:</span> <span className="lg:text-green-500 lg:font-medium lg:uppercase">Available</span></p>
                }
                {matrixItemDetail && matrixItemDetail.ItemShops.ItemShop[0].qoh == 0 &&
                  <p><span className="lg:font-medium">STOCK:</span> <span className="lg:text-red-500 lg:font-medium lg:uppercase">Out of Stock</span></p>
                }
                <MatrixFilter item={item} handleInputChange={handleInputChange} checkedInputs={checkedInputs} />
                <div className="lg:mt-8">
                  {matrixItemDetail && matrixItemDetail.ItemShops.ItemShop[0].qoh > 0 &&
                    <button
                      onClick={() => addItem(getSingleProductFromMatrix(checkedInputs))}
                      aria-label={`Add ${product.name} to your cart`}
                      className="p-2 bg-fabred focus:bg-red-400 text-white font-bold rounded mr-2"
                    >
                      Add to Cart
                </button>
                  }
                  {matrixItemDetail && matrixItemDetail.ItemShops.ItemShop[0].qoh == 0 &&
                    <button
                      onClick={() => addItem(getSingleProductFromMatrix(checkedInputs))}
                      aria-label={`Add ${product.name} to your cart`}
                      className="lg:p-2 lg:bg-fabgrey lg:text-gray-400 lg:font-bold lg:rounded lg:mr-2"
                      disabled
                    >
                      Add to Cart
                </button>
                  }
                  {cartCount > 0 ? (
                    <Link href="/cart">
                      <button className="p-2 bg-fabred text-white font-bold rounded">View Cart</button>
                    </Link>
                  ) : ''}
                </div>
              </div>
            </div>
          </div>
          <hr className="mt-12 lg:hidden" />
          <div className="mx-8 my-12 lg:mx-60 lg:mb-24 lg:mt-12 lg:p-4 lg:shadow-lg lg:rounded lg:max-w-full lg:h-auto lg:border-none">
            <h3 className="lg:mx-4 my-4 text-2xl font-black">{product.name} FULL DESCRIPTION</h3>
            <section>
              <div className="lg:mx-4 my-4 prose lg:font-medium" dangerouslySetInnerHTML={{ __html: product.description }}></div>
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
          <title>{item.description} - FAB Defense (UK)</title>
          <meta name="description" content={item.description} />
          <meta name="og:title" content={item.description} />
          <meta name="og:description" content={product.description} />
          <meta name="og:image" content={product.image} />
        </Head>
        <div>
          <div className="lg:mx-60">
            <button className="ml-2 mt-2 p-2 bg-black text-white text-sm rounded" onClick={() => router.back()}>Back</button>
          </div>
          <div className="mx-8 lg:mt-4 lg:mx-60">
            <div className="lg:grid lg:grid-cols-2 lg:gap-1">

              <div className="flex justify-center">
                <ProductImage imageURL={image} />
                {/* <img src={product.image} alt={`Image of the ${product.name}`} width="420" className="p-4 shadow-lg rounded max-w-full h-auto align-middle border-none" /> */}
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
                      className="p-2 bg-fabred focus:bg-red-400 text-white font-bold rounded mr-2"
                    >
                      Add to Cart
                </button>
                  }
                  {item.ItemShops.ItemShop[0].qoh == 0 &&
                    <button
                      onClick={() => addItem(product)}
                      aria-label={`Add ${product.name} to your cart`}
                      className="lg:p-2 lg:bg-fabgrey lg:text-gray-400 lg:font-bold lg:rounded lg:mr-2"
                      disabled
                    >
                      Add to Cart
                </button>
                  }
                  {cartCount > 0 ? (
                    <Link href="/cart">
                      <button className="p-2 bg-fabred text-white font-bold rounded">View Cart</button>
                    </Link>
                  ) : ''}
                </div>
              </div>
            </div>
          </div>

          <div className="mx-8 mt-8 lg:mx-60 lg:mb-24 lg:mt-12 lg:p-4 lg:shadow-lg lg:rounded lg:max-w-full lg:h-auto lg:border-none">
            <h3 className="lg:mx-4 lg:my-4 text-xl font-black">{product.name} FULL DESCRIPTION</h3>
            <section>
              <div className="lg:mx-4 my-4 prose font-medium" dangerouslySetInnerHTML={{ __html: product.description }}></div>
            </section>
          </div>
        </div>
      </Layout >
    )
  }
}

export default Product

export async function getStaticPaths() {
  const paths = []
  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const { id } = params
  let Item

  // Get Item using ID and check if it is a FAB Item, Matrix or Single Item
  const res = await getItem(id)
  Item = await res.data.Item
  console.log(Item)

  if (Item.manufacturerID === '55' && Item.itemMatrixID != '0') {
    const res = await getMatrixItem(id)
    Item = await res.data.ItemMatrix
    console.log(Item)
  }

  if (Item.manufacturerID != '55') {
    const res = await getMatrixItem(id)
    Item = await res.data.ItemMatrix
    console.log(Item)
  }

  return {
    props: { Item, params },
    revalidate: 10
  }
}

