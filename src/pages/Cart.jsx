import { Suspense, useEffect, useState } from "react";
import useCartContext from "../hooks/useCartContext";
import CartItemList from "../components/Cart/CartItemList";
import CartDetails from "../components/Cart/CartDetails";

const Cart = () => {
  const {
    cart,
    cartId,
    loading,
    getCart,
    updateCartItemQuantity,
    deleteCartItems,
  } = useCartContext();

  const [localCart, setLocalCart] = useState(cart);

  useEffect(() => {
  if (!cart && !loading) {
    getCart();
  }
}, [cart, loading]);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  if (loading) return(
    <div className="flex justify-center items-center py-10 min-h-screen">
        <span className="loading loading-spinner loading-xl text-stone-400"></span>
    </div>
  );
  if (!localCart) return <p className="flex justify-center items-center py-10 min-h-screen">No Cart Found</p>;

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    const prevLocalCartCopy = localCart;

    setLocalCart((prevLocalCart) => {
      const updatedItmes = prevLocalCart.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              total_price: item.product.price * newQuantity,
            }
          : item
      );

      return {
        ...prevLocalCart,
        items: updatedItmes,
        total_price: updatedItmes.reduce(
          (sum, item) => sum + item.total_price,
          0
        ),
      };
    });

    try {
      await updateCartItemQuantity(itemId, newQuantity);
    } catch (error) {
      console.log(error);
      setLocalCart(prevLocalCartCopy);
    }
  };

  const handleRemoveItem = async (itemId) => {
    setLocalCart((prevLocalCart) => {
      const updatedItems = prevLocalCart.items.filter(
        (item) => item.id != itemId
      );

      return {
        ...prevLocalCart,
        items: updatedItems,
        total_price: updatedItems.reduce(
          (sum, item) => sum + item.total_price,
          0
        ),
      };
    });

    try {
      await deleteCartItems(itemId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen py-8">
    <div className="container mx-auto px-4 max-w-7xl">
        <div className="lg:col-span-2">
          <Suspense fallback={<div className="bg-white rounded-lg shadow-sm border p-8"><p>Loading...</p></div>}>
            <CartItemList
              items={localCart.items}
              handleUpdateQuantity={handleUpdateQuantity}
              handleRemoveItem={handleRemoveItem}
            />
          </Suspense>
        </div>
        <div className="lg:col-span-1 mt-6 w-1/2 ml-auto">
          <CartDetails
            totalPrice={localCart?.total_price || 0}
            itemCount={localCart?.items?.length || 0}
            cartId={cartId}
            getCart={getCart}
          />
      </div>
    </div>
  </div>
  );
};

export default Cart;