import { useState, useEffect } from "react";
import WishlistItemList from "../components/Wishlist/WishlistItemList";
import useWishlist from "../hooks/useWishlist";

const Wishlist = () => {
  const { wishlist, loading, removeWishlistItem } = useWishlist();
  const [localWishlist, setLocalWishlist] = useState([]);

  useEffect(() => {
    setLocalWishlist(wishlist);
  }, [wishlist]);

  const handleRemoveItem = async (itemId) => {
    setLocalWishlist((prev) => prev.filter((item) => item.id !== itemId));
    try {
      await removeWishlistItem(itemId);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 min-h-screen">
        <span className="loading loading-spinner loading-xl text-gray-500"></span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      {localWishlist.length > 0 ? (
        <WishlistItemList items={localWishlist} handleRemoveItem={handleRemoveItem} />
      ) : (
        <p className="text-gray-500">Your wishlist is empty</p>
      )}
    </div>
  );
};

export default Wishlist;
