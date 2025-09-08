import { useCallback, useEffect, useState } from "react";
import authApiClient from "../services/auth-api-client";

const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch wishlist
  const getWishlist = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authApiClient.get("/Wishlist/");
      setWishlist(response.data || []);
      return response.data;
    } catch (error) {
      console.error("Error fetching wishlist", error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const isInWishlist = useCallback(
    (productId) => {
      return wishlist.some((item) => item.product.id === productId);
    },
    [wishlist]
  );

  // Add item
  const addWishlistItem = useCallback(
    async (product_id) => {
      if (isInWishlist(product_id)) return;

      setLoading(true);
      try {
        await authApiClient.post("/Wishlist/", { product_id });
        await getWishlist();
      } catch (error) {
        console.error("Error adding to wishlist", error);
      } finally {
        setLoading(false);
      }
    },
    [getWishlist, isInWishlist]
  );


  // Remove item
  const removeWishlistItem = useCallback(
    async (itemId) => {
      if (!itemId) return;
      setLoading(true);
      try {
        await authApiClient.delete(`/Wishlist/${itemId}/`);
        await getWishlist();
      } catch (error) {
        console.error("Error removing wishlist item", error);
      } finally {
        setLoading(false);
      }
    },
    [getWishlist]
  );


  useEffect(() => {
    getWishlist();
  }, [getWishlist]);

  return {
    wishlist,
    loading,
    getWishlist,
    addWishlistItem,
    removeWishlistItem,
    isInWishlist,
  };
};

export default useWishlist;
