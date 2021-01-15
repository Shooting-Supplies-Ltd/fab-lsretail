import Image from 'next/image'

const BannerBottom = () => {
  return (
    <div className="mx-4 lg:mx-60 lg:my-12 lg:flex">
      {/* <img src="banners/ruger-stock.png" alt="FAB Defense Superior Ergonomics & Ruger stock" className="px-12 my-12 lg:my-0 lg:p-0" /> */}
      <Image
        src="/banners/ruger-stock.png"
        width={900}
        height={300}
        alt="FAB Defense Superior Ergonomics & Ruger stock"
        className="px-12 my-12 lg:my-0 lg:p-0" />
      <p className="p-6 text-base lg:p-12 lg:font-medium lg:text-lg">FAB-Defense® superior ergonomics, functionality and durability, reflects decades of design experience through continuous improvement and successive generations of weapon accessories.</p>
    </div>
  )
}

export default BannerBottom