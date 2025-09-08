import { useState } from "react";
import { FaHeart, FaCheck } from "react-icons/fa";
import useWishlist from "../../hooks/useWishlist";

const AddToWishlistButton = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const { addWishlistItem, isInWishlist } = useWishlist();

  const alreadyInWishlist = isInWishlist(product.id);

  const handleWishlist = async () => {
    if (alreadyInWishlist) return;
    setIsAdding(true);
    try {
      await addWishlistItem(product.id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      className="btn btn-rose bg-gray-300 w-full flex items-center justify-center gap-2"
      onClick={handleWishlist}
      disabled={isAdding || alreadyInWishlist}
    >
      {isAdding ? (
        <span className="flex items-center">
          <span className="loading loading-spinner loading-sm mr-2"></span>
          Adding...
        </span>
      ) : alreadyInWishlist ? (
        <span className="flex items-center">
          <FaCheck className="mr-2 h-4 w-4" />
          Added to Wishlist
        </span>
      ) : (
        <span className="flex items-center">
          <FaHeart className="mr-2 h-4 w-4" />
          Add to Wishlist
        </span>
      )}
    </button>
  );
};

export default AddToWishlistButton;
