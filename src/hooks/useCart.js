import { useCallback, useEffect, useState } from "react";
import authApiClient from "../services/auth-api-client";

const useCart = () => {
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));
  const [loading, setLoading] = useState(false);

  // Get the cart
  const getCart = useCallback(async () => {
    setLoading(true);
    try {
      let id = cartId;
      const response = await authApiClient.get(`/cart/${id}/`);
      setCart(response.data);
      setCartId(response.data.id);
      localStorage.setItem("cartId", response.data.id);
      return response.data;
    } catch (error) {
      console.log("Error fetching cart", error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [cartId]);

  // Add items to the cart
  const AddCartItems = useCallback(
    async (product_id, quantity) => {
      let id = cartId;
      if (!id) {
        const newCart = await getCart();
        if (!newCart) return null;
        id = newCart.id;
      }
      setLoading(true);
      try {
        const response = await authApiClient.post(`/cart/${id}/items/`, {
          product_id,
          quantity,
        });
        await getCart();
        return response.data;
      } catch (error) {
        console.log("Error adding items", error);
      } finally {
        setLoading(false);
      }
    },
    [cartId, getCart]
  );

  // Update item quantity
  const updateCartItemQuantity = useCallback(
    async (itemId, quantity) => {
      if (!cartId) {
        await getCart();
      }
      try {
        await authApiClient.patch(`/cart/${cartId}/items/${itemId}/`, {
          quantity,
        });
        await getCart();
      } catch (error) {
        console.log("Error updating cart items", error);
      }
    },
    [cartId, getCart]
  );

  // Delete cart item
  const deleteCartItems = useCallback(
    async (itemId) => {
      if (!cartId) {
        await getCart();
      }
      try {
        await authApiClient.delete(`/cart/${cartId}/items/${itemId}/`);
        await getCart();
      } catch (error) {
        console.log("Error deleting cart items", error);
      }
    },
    [cartId, getCart]
  );

  useEffect(() => {
    getCart();
  }, [getCart]);

  return {
    cart,
    loading,
    cartId,
    getCart,
    AddCartItems,
    updateCartItemQuantity,
    deleteCartItems,
  };
};

export default useCart;
