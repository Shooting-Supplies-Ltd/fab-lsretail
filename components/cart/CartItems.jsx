import Image from 'next/image'
import { useShoppingCart } from 'use-shopping-cart'
import { TiDelete } from "react-icons/ti";

const CartForm = (props) => {
  const { cartDetails } = props
  const { removeItem, setItemQuantity } = useShoppingCart()

  return (
    <>
      {Object.keys(cartDetails).map(item => {
        return (
          <tr key={cartDetails[item].sku}>
            <td className="p-1 lg:p-5 border-b border-gray-200 bg-white text-sm">
              {cartDetails[item].itemID != 7051 &&
                <button
                  onClick={() => removeItem(cartDetails[item].sku)}
                  aria-label={`Remove ${cartDetails[item].name} from your cart`}
                >
                  <TiDelete size="2em" />
                </button>
              }
              {cartDetails && cartDetails[item].itemID === 7051 &&
                <div></div>
              }
            </td>
            <td className="hidden lg:block px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <Image
                src={cartDetails[item].image}
                width={80}
                height={80}
                alt={`Image of ${cartDetails[item].name}`}
              />
            </td>
            <td className="lg:hidden"></td>
            <td className="text-xs p-2 lg:p-5 lg:border-b lg:border-gray-200 lg:bg-white lg:text-sm">{cartDetails[item].name}</td>
            <td className="p-2 text-xs lg:border-b lg:border-gray-200 lg:bg-white lg:text-sm">
              {cartDetails[item].itemID != 7051 &&
                <select name="qty" id="qty" onChange={(event) => { setItemQuantity(cartDetails[item].sku, event.target.value) }} className="bg-white text-base border-2 border-black rounded">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              }
            </td>
            <td className="p-2 lg:w-24 lg:px-5 lg:py-5 border-b border-gray-200 bg-white text-sm">{cartDetails[item].formattedValue}</td>
          </tr>
        )
      })}
    </>
  )
}

export default CartForm