import Link from 'next/link'
import slugify from 'slugify'
import Image from 'next/image'

const ProductCard = (props) => {
  const { item } = props
  const name = item.description
  const slug = slugify(item.description).toLocaleLowerCase()

  return (
    <>
      <div className="mx-8 my-4 lg:mx-8 lg:my-4 lg:w-64 lg:overflow-hidden lg:flex lg:flex-col rounded shadow-lg border-2 border-black hover:border-fabred" key={item.itemID ? item.itemID : item.itemMatrixID}>
        <Link href={item.itemID ? `/shop/[id]?item=${slug}&id=${item.itemID}` : `/shop/[id]?matrix=true&item=${slug}&id=${item.itemMatrixID}`}>
          <a>
            <div className="flex justify-center lg:h-58 p-4 lg:object-center lg:object-scale-down">
              {item.Images &&
                <Image
                  src={`${item.Images.Image.baseImageURL}/w_250/${item.Images.Image.publicID}.jpg`}
                  alt={`Photo of ${item.description.image}`}
                  width={200}
                  height={200}
                />}
            </div>
            <div className="h-44 p-4 bg-black text-white font-bold uppercase">
              <h2>{item.description}</h2>
              <p className="mt-4 align-bottom inline-block text-lg">£{item.Prices.ItemPrice[0].amount}</p>
            </div>
          </a>
        </Link>
      </div >
    </>
  )
}

export default ProductCard