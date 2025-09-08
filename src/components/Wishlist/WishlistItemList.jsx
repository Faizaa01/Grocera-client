import { FaRegTrashCan } from "react-icons/fa6";
import { ShoppingCart, CheckCircle } from "lucide-react";
import { useState } from "react";
import useCart from "../../hooks/useCart";
import defaultImage from "../../assets/images/default.png";

const WishlistItemList = ({ items, handleRemoveItem }) => {
  const { AddCartItems } = useCart();
  const [loadingItems, setLoadingItems] = useState({});
  const [movedItems, setMovedItems] = useState({});

  const handleMoveToCart = async (item) => {
    if (movedItems[item.id]) return;

    setLoadingItems((prev) => ({ ...prev, [item.id]: true }));
    try {
      await AddCartItems(item.product.id, 1);
      handleRemoveItem(item.id);
      setMovedItems((prev) => ({ ...prev, [item.id]: true }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingItems((prev) => ({ ...prev, [item.id]: false }));
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-4 border rounded shadow-sm hover:shadow-md transition bg-gray-100"
        >
          <div className="flex items-center gap-10">
            <img
              src={item.product.images?.length > 0 ? item.product.images[0].image : defaultImage}
              alt={item.product.name}
              className="h-16 w-16 object-cover rounded-full"
            />
            <div>
              <h2 className="font-medium text-gray-900">{item.product.name}</h2>
              <p className="text-sm text-gray-600">${item.product.price}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => handleMoveToCart(item)}
              className="btn btn-xs btn-outline flex items-center gap-1"
              disabled={loadingItems[item.id] || movedItems[item.id]}
            >
              {loadingItems[item.id] ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : movedItems[item.id] ? (
                <CheckCircle size={14} className="text-lime-700" />
              ) : (
                <ShoppingCart size={14} />
              )}
              Move to Cart
            </button>

            <button
              onClick={() => handleRemoveItem(item.id)}
              className="btn btn-xs btn-ghost"
              disabled={loadingItems[item.id]}
            >
              <FaRegTrashCan size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishlistItemList;
