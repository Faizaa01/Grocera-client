import { useState } from "react";
import authApiClient from "../../services/auth-api-client";
import useAuthContext from "../../hooks/useAuthContext";

const CartDetails = ({ totalPrice, itemCount, cartId, getCart }) => {
  const { user, setUser } = useAuthContext();
  const [popup, setPopup] = useState({ show: false, message: "", type: "info" });
  const orderTotal = parseFloat(totalPrice)

  const createOrder = async () => {
    if (user.balance < orderTotal) {
      setPopup({ show: true, message: "You don’t have enough balance. Please deposit money.", type: "error" });
      return;
    }

    try {
      const response = await authApiClient.post("/orders/", { cart_id: cartId });
      if (response.status === 201) {
        if (getCart) await getCart();
        alert("Order placed successfully!");
      }
    } catch (error) {
      console.log(error);
      setPopup({ show: true, message: "Something went wrong while placing your order.", type: "error" });
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <div className="space-y-2 border-t border-gray-600 pt-2 mt-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal {itemCount} items</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Shipping</span>
            <span>"Free"</span>
          </div>
          <div className="border-t border-gray-600 pt-2 mt-2">
            <div className="flex justify-between font-medium">
              <span>Order Total</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {popup.show && (
          <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-6 bg-white rounded shadow-lg border`}>
            <p className={`${popup.type === "error" ? "text-red-700" : "text-green-700"}`}>
              {popup.message}
            </p>
            <button
              onClick={() => setPopup({ ...popup, show: false })}
              className="mt-4 btn btn-sm btn-neutral w-full"
            >
              Close
            </button>
          </div>
        )}

        <div className="card-actions justify-end mt-4">
          <button
            disabled={itemCount === 0}
            onClick={createOrder}
            className="btn btn-neutral w-full"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
