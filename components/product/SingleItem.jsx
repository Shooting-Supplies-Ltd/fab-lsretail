import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart';

import Layout from '../Layout';
import ProductImage from './ProductImage';

const SingleItem = ({ item }) => {
  const router = useRouter();
  const { cartCount, addItem } = useShoppingCart();

  const product = {
    name: item.description,
    description: item.ItemECommerce ? item.ItemECommerce.longDescription : '',
    shortDescription: item.ItemECommerce ? item.ItemECommerce.shortDescription : '',
    sku: item.customSku,
    price: item.Prices.ItemPrice[0].amount.replace('.', ''),
    currency: 'GBP',
    image: `${item.Images.Image.baseImageURL}/w_300/${item.Images.Image.publicID}.jpg`,
    itemID: item.itemID,
    unitPrice: item.Prices.ItemPrice[0].amount,
  };

  return (
    <Layout>
      <Head>
        <title className="uppercase">{`${item.description} | FAB Defense (UK)`}</title>
        <link rel="canonical" href={`https://fabdefense.co.uk${router.asPath}`} />
        <meta name="description" content={item.description} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content={`fab defense, ${item.description.replace(' ', ',')}`} />
        <meta property="og:title" content={`${item.description}`} />
        <meta property="og:description" content={item.description} />
        <meta
          property="og:image"
          content={`${item.Images.Image.baseImageURL}/w_300/${item.Images.Image.publicID}.jpg`}
          alt={`${item.description}`}
        />
        <meta property="og:url" content={`https://fabdefense.co.uk${router.asPath}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta charSet="UTF-8" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'http://schema.org',
              '@type': 'Product',
              sku: item.customSku,
              image: `${item.Images.Image.baseImageURL}/w_600/${item.Images.Image.publicID}.webp`,
              name: item.description,
              description: item.ItemECommerce.shortDescription.replace(/(<([^>]+)>)/gi, ''),
              brand: 'FAB Defense',
              offers: {
                '@type': 'Offer',
                url: `https://shootingsuppliesltd.co.uk${router.asPath}`,
                priceCurrency: 'GBP',
                price: item.Prices?.ItemPrice[0]?.amount,
                itemCondition: 'https://schema.org/NewCondition',
                availability:
                  item.ItemShops?.ItemShop[0]?.qoh > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
              },
            }),
          }}
        />
      </Head>
      <div className="divide-y-4 divide-black divide-double">
        <div className="mx-8 my-12 lg:my-20 lg:mx-60">
          <div className="flex flex-col lg:flex-row justify-center">
            <div className="lg:w-1/2 p-2 flex justify-center">
              <ProductImage imageURL={`${item.Images.Image.baseImageURL}/w_300/${item.Images.Image.publicID}.jpg`} />
            </div>
            <div className="lg:w-1/2 p-2">
              <h1 className="font-black text-3xl uppercase">{item.description}</h1>
              <p className="my-4 font-black text-3xl uppercase mb-2">
                {formatCurrencyString({
                  value: item.Prices.ItemPrice[0].amount.replace('.', ''),
                  currency: 'GBP',
                })}
              </p>
              <div
                className="my-4 font-medium"
                dangerouslySetInnerHTML={{ __html: item.ItemECommerce ? item.ItemECommerce.shortDescription : '' }}
              />
              <p>
                <span className="font-medium">SKU:</span>
                {item.customSku}
              </p>
              {item.ItemShops.ItemShop[0].qoh > 0 && (
                <p>
                  <span className="font-medium">STOCK:</span>{' '}
                  <span className="text-green-500 font-medium uppercase">Available</span>
                </p>
              )}
              {item.ItemShops.ItemShop[0].qoh == 0 && (
                <p>
                  <span className="font-medium">STOCK:</span>{' '}
                  <span className="text-red-500 font-medium uppercase">Out of Stock</span>
                </p>
              )}
              <div className="mt-8">
                {item.ItemShops.ItemShop[0].qoh > 0 && (
                  <button
                    onClick={() => addItem(product)}
                    aria-label={`Add ${item.decription} to your cart`}
                    className="p-3 bg-fabred focus:bg-red-400 text-white font-bold rounded mr-2"
                  >
                    Add to Cart
                  </button>
                )}
                {item.ItemShops.ItemShop[0].qoh == 0 && (
                  <button
                    onClick={() => addItem(product)}
                    aria-label={`Add ${item.description} to your cart`}
                    className="p-3 bg-fabgrey text-gray-400 font-bold rounded mr-2"
                    disabled
                  >
                    Add to Cart
                  </button>
                )}
                {cartCount > 0 ? (
                  <Link href="/cart">
                    <button className="p-3 bg-fabred text-white font-bold rounded">View Cart</button>
                  </Link>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mx-8 my-8 lg:mx-60 lg:my-20">
          <h3 className="mt-8 lg:mb-2 text-2xl font-black">DESCRIPTION</h3>
          <section>
            <div
              className="my-4 prose font-medium"
              dangerouslySetInnerHTML={{ __html: item.ItemECommerce ? item.ItemECommerce.longDescription : '' }}
            />
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default SingleItem;
