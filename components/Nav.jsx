import Link from 'next/link'
import { useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import CartIcon from './cart/CartIcon'
import CartDisplay from './cart/CartDisplay'

const Nav = () => {
  const [cartDisplay, setCartDisplay] = useState(false)
  const [menuToggle, setMenuToggle] = useState(false)
  const { cartCount } = useShoppingCart()

  const updateCartDisplay = () => {
    setCartDisplay(!cartDisplay)
  }

  return (
    <div className="lg:text-white">
      <div className="lg:bg-fabgrey lg:text-sm">
        <div className="lg:mx-48 lg:flex">
          <div className="lg:w-1/2 lg:flex lg:justify-center">
            {/* <p>Shooting Supplies Ltd, All rights Reserved.</p> */}
          </div>
          <div className="p-2 text-xs lg:w-1/2 flex justify-center lg:justify-end bg-fabgrey text-white lg:text-sm">
            <p>Contact Us: <a href="tel:01527831261" className="hover:text-fabred">01527 831 261</a></p>
          </div>
        </div>
      </div>
      <div className="lg:h-24 bg-black lg:text-white">
        <div className="lg:mx-48 lg:h-24 lg:flex lg:justify-between lg:items-center">
          <div className="p-0 flex justify-center lg:block lg:w-1/3">
            <Link href="/">
              <a><img src="/logos/FAB-logo.webp" alt="FAB Defense Logo" width="120" className="lg:py-6 lg:mr-8" /></a>
            </Link>
          </div>
          <div className="hidden lg:w-1/3 lg:flex lg:justify-center">
            <ul className="lg:flex lg:text-white lg:text-xl lg:font-bold lg:space-x-16">
              <Link href="/shop">
                <a>
                  <li className="lg:hover:text-fabred">SHOP</li>
                </a>
              </Link>
              <Link href="/blog">
                <a><li className="lg:hover:text-fabred">BLOG</li></a>
              </Link>
              <Link href="/contact">
                <a><li className="lg:hover:text-fabred">CONTACT</li></a>
              </Link>
            </ul>
          </div>
          <div className="hidden lg:w-1/3 lg:flex lg:justify-end">
            <div onMouseEnter={updateCartDisplay} onMouseLeave={updateCartDisplay} >
              <CartIcon />
              {cartCount > 0 && cartDisplay && <CartDisplay />}
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 lg:p-2 flex justify-center text-white bg-fabgrey text-xs lg:text-base">
        <p>Free Delivery on Orders over £50</p>
      </div>
      <div className="p-4 bg-fabred text-white text-center lg:hidden">
        <button onClick={() => setMenuToggle(!menuToggle)} className="w-full font-bold uppercase">Menu</button>
      </div>
      {menuToggle &&
        <div className="absolute z-10 bg-fabgrey w-full text-white">
          <ul className="text-center uppercase font-bold">
            <Link href="/products">
              <a>
                <li className="p-4 border-b-2 border-b-white">Shop</li>
              </a>
            </Link>
            <Link href="/blog">
              <a>
                <li className="p-4 border-b-2 border-b-white">Blog</li>
              </a>
            </Link>
            <Link href="/contact">
              <a>
                <li className="p-4 border-b-2 border-b-white">Contact</li>
              </a>
            </Link>
            <Link href="/cart">
              <a>
                <li className="p-4">Cart</li>
              </a>
            </Link>
          </ul>
        </div>}
    </div>
  )
}

export default Nav