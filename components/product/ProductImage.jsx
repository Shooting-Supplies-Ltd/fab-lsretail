import Image from 'next/image'

const ProductImage = (props) => {
  return (
    <Image
      src={props.imageURL}
      width={300}
      height={300}
      quality={100}
    />
  )
}

export default ProductImage