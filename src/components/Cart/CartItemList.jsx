import { FiXCircle } from "react-icons/fi";
import defaultImage from "../../assets/images/default.png";

const CartItemList = ({ items, handleUpdateQuantity, handleRemoveItem }) => {
  if (!items || items.length === 0) {
    return (
      <div className="py-6 text-center text-gray-500">Your cart is empty</div>
    );
  }

  

  return (
    <div className="space-y-4 card bg-base-100 shadow-xl">
      <h2 className="text-xl font-semibold p-4 bg-neutral text-white rounded-t-md text-center">
        Shopping Cart
      </h2>

      <div className="overflow-x-auto p-2">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="font-medium flex items-center">
                  <img
                    src={
                      item.product.images?.length > 0
                        ? item.product.images[0].image
                        : defaultImage
                    }
                    alt={item.product.name || "Product Image"}
                    className="h-16 w-16 object-cover"
                  />
                </td>
                <td>{item.product.name}</td>
                <td>${item.product.price}</td>
                <td>
                  <div className="flex items-center join">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="btn btn-xs btn-outline join-item"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
                      className="input input-xs input-bordered join-item w-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="btn btn-xs btn-outline join-item"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="font-medium">{item.total_price}</td>
                <td>
                  <button
                    className="btn btn-ghost btn-xs btn-circle"
                    aria-label={`Remove ${item.name} from cart`}
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <FiXCircle className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartItemList;
