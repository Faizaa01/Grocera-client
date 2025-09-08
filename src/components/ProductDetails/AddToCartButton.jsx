import { useState } from "react";
import { FaCheck, FaMinusCircle, FaPlusCircle, FaShoppingCart } from "react-icons/fa";
import useCartContext from "../../hooks/useCartContext";
import AddToWishlistButton from "./AddToWishlistButton";



const AddToCartButton = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { AddCartItems } = useCartContext();

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const addToCart = async () => {
    setIsAdding(true);
    try {
      await AddCartItems(product.id, quantity);
      setIsAdded(true);
      setIsAdding(false);
    } catch (error) {
      console.log(error);
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="join">
        <button
          className="btn btn-outline join-item"
          onClick={decreaseQuantity}
          disabled={quantity <= 1}
        >
          <FaMinusCircle className="h-4 w-4" />
        </button>
        <input
          type="number"
          value={quantity}
          readOnly
          className="input input-bordered join-item w-16 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          className="btn btn-outline join-item"
          onClick={increaseQuantity}
          disabled={quantity >= product.stock}
        >
          <FaPlusCircle className="h-4 w-4" />
        </button>
      </div>
      <div className="w-1/2 mt-auto flex flex-col md:flex-row gap-2">
        <button
        className="w-full btn btn-primary opacity-90 bg-sky-500 hover:bg-primary"
        onClick={addToCart}
        disabled={isAdding || isAdded || product.stock === 0}
      >
        {isAdding ? (
          <span className="flex items-center">
            <span className="loading loading-spinner loading-sm mr-2"></span>
            Adding...
          </span>
        ) : isAdded ? (
          <span className="flex items-center">
            <FaCheck className="mr-2 h-4 w-4" />
            Added to Cart
          </span>
        ) : (
          <span className="flex items-center">
            <FaShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </span>
        )}
      </button>
          <AddToWishlistButton product={product} />
      </div>
    </div>
  );
};

export default AddToCartButton;