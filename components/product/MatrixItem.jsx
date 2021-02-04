import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'

import Layout from "../Layout";
import MatrixFilter from '../../components/product/MatrixFilter'
import ProductImage from '../../components/product/ProductImage'

const MatrixItem = ({ item, matrixItem, image, matrixLoading, handleInputChange, checkedInputs }) => {
  const router = useRouter()
  const { cartCount, addItem } = useShoppingCart()

  function getSingleProductFromMatrix(id) {
    const result = item.Items.Item.filter(obj => obj.itemID == id)
    return {
      name: result[0].description,
      description: result[0].ItemECommerce ? result[0].ItemECommerce.longDescription : '',
      shortDescription: result[0].ItemECommerce ? result[0].ItemECommerce.shortDescription : '',
      sku: result[0].customSku,
      price: result[0].Prices.ItemPrice[0].amount.replace('.', ''),
      currency: 'GBP',
      image: image ? image : `${item.Images.Image.baseImageURL}/w_300/${item.Images.Image.publicID}.jpg`,
      itemID: result[0].itemID,
      unitPrice: result[0].Prices.ItemPrice[0].amount,
    }
  }

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
        <meta property="og:image" content={`${item.Images.Image.baseImageURL}/w_300/${item.Images.Image.publicID}.jpg`} alt={`${item.description}`}></meta>
        <meta property="og:url" content={`https://fabdefense.co.uk${router.asPath}`}></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta charSet="UTF-8"></meta>
      </Head>
      <div className="divide-y-4 divide-black divide-double">
        <div className="mx-8 my-12 lg:my-20 lg:mx-60">
          <div className="flex justify-center">
            <div className="w-1/2 p-2 flex justify-center">
              {matrixLoading &&
                <img src="/loading.gif" alt="Loading spinner" />
              }
              {!matrixLoading &&
                <ProductImage imageURL={matrixItem ? `${matrixItem.Images.Image.baseImageURL}/w_300/${matrixItem.Images.Image.publicID}.jpg` : `${item.Images.Image.baseImageURL}/w_300/${item.Images.Image.publicID}.jpg`} />
              }
            </div>
            <div className="w-1/2 p-2">
              <h1 className="font-black text-3xl uppercase">{item.description}</h1>
              <p className="my-4 font-black text-3xl uppercase mb-2">{formatCurrencyString({
                value: item.Prices.ItemPrice[0].amount.replace('.', ''),
                currency: 'GBP',
              })}</p>
              <div className="my-4 font-medium" dangerouslySetInnerHTML={{ __html: item.ItemECommerce ? item.ItemECommerce.shortDescription : '' }}></div>
              {matrixItem &&
                <p><span className="font-medium">SKU: {matrixItem.customSku}</span></p>
              }
              {matrixItem && matrixItem.ItemShops.ItemShop[0].qoh > 0 &&
                <p><span className="font-medium">STOCK:</span> <span className="text-green-500 font-medium uppercase">Available</span></p>
              }
              {matrixItem && matrixItem.ItemShops.ItemShop[0].qoh == 0 &&
                <p><span className="font-medium">STOCK:</span> <span className="text-red-500 font-medium uppercase">Out of Stock</span></p>
              }
              <MatrixFilter item={item} handleInputChange={handleInputChange} checkedInputs={checkedInputs} />
              <div className="mt-8">
                {matrixItem && matrixItem.ItemShops.ItemShop[0].qoh > 0 &&
                  <button
                    onClick={() => addItem(getSingleProductFromMatrix(checkedInputs))}
                    aria-label={`Add ${matrixItem.description} to your cart`}
                    className="p-3 bg-fabred focus:bg-red-400 text-white font-bold rounded mr-2"
                  >
                    Add to Cart
            </button>
                }
                {matrixItem && matrixItem.ItemShops.ItemShop[0].qoh == 0 &&
                  <button
                    onClick={() => addItem(getSingleProductFromMatrix(checkedInputs))}
                    aria-label={`Add ${matrixItem.name} to your cart`}
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
            <div className="lg:mx-4 my-4 prose font-medium" dangerouslySetInnerHTML={{ __html: item.ItemECommerce ? item.ItemECommerce.longDescription : '' }}></div>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default MatrixItem