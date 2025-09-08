import { Link } from "react-router";
import defaultImage from "../../assets/images/default.png";
import { Heart, ShoppingCart, CheckCircle } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import useCartContext from "../../hooks/useCartContext";
import useWishlist from "../../hooks/useWishlist";

const bgColors = [
  "bg-rose-50",
  "bg-amber-50",
  "bg-emerald-50",
  "bg-sky-50",
  "bg-purple-50",
];

const ProductItem = ({ product, index }) => {
  const bgClass = bgColors[index % bgColors.length];
  const { AddCartItems } = useCartContext();
  const { wishlist, addWishlistItem, isInWishlist, removeWishlistItem } = useWishlist();

  const [addingCart, setAddingCart] = useState(false);
  const [addedCart, setAddedCart] = useState(false);
  const [addingWishlist, setAddingWishlist] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setAddingCart(true);
    try {
      await AddCartItems(product.id, 1);
      setAddingCart(false);
      setAddedCart(true);
      setTimeout(() => setAddedCart(false), 2000);
    } catch (error) {
      console.error(error);
      setAddingCart(false);
    }
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    setAddingWishlist(true);

    try {
      if (isInWishlist(product.id)) {
        const itemToRemove = wishlist.find((item) => item.product.id === product.id);
        if (itemToRemove) {
          await removeWishlistItem(itemToRemove.id);
        }
      } else {
        await addWishlistItem(product.id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setAddingWishlist(false);
    }
  };


  return (
    <Link to={`/shop/${product.id}`}>
      <div
        className={`relative shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group ${bgClass} border border-gray-100`}
      >
        {/* Image Container */}
        <div className="w-full h-76 overflow-hidden bg-white relative">
          <img
            src={
              product.images?.length > 0
                ? product.images[0].image
                : defaultImage
            }
            alt={product.name || "Product Image"}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-90"
          />
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          <div className="space-y-2">
            <h2 className="text-base font-medium text-gray-900 leading-tight line-clamp-2">
              {product.name || "Product Name"}
            </h2>
            <p className="text-sm text-gray-600 line-clamp-2">
              {product.description ||
                "Short description about the product goes here."}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              ${product.price ?? "0.00"}
            </h3>

            <div className="flex gap-2">
              {/* Add to Cart */}
              <button
                aria-label="Add to Cart"
                onClick={handleAddToCart}
                className="p-2 bg-gray-200 hover:bg-lime-100 rounded-full text-gray-600 hover:text-lime-700 transition-colors duration-200 flex items-center justify-center"
              >
                {addingCart ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : addedCart ? (
                  <CheckCircle size={16} className="text-lime-700" />
                ) : (
                  <ShoppingCart size={16} />
                )}
              </button>

              {/* Add to Wishlist */}
              <button
                onClick={handleWishlist}
                disabled={addingWishlist}
                aria-label="Add to Wishlist"
                className="p-2 bg-gray-200 hover:bg-rose-100 rounded-full text-gray-600 hover:text-rose-600 transition-colors duration-200 flex items-center justify-center"
              >
                {addingWishlist ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : isInWishlist(product.id) ? (
                  <FaHeart size={16} className="text-red-500" />
                ) : (
                  <Heart size={16} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
