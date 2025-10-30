import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import OrderTable from "./OrderTable";
import authApiClient from "../../services/auth-api-client";

const OrderCard = ({ order, onCancel }) => {
  const { user } = useAuthContext();
  const [status, setStatus] = useState(order.status);

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    try {
      const response = await authApiClient.patch(
        `/orders/${order.id}/update_status/`,
        { status: newStatus }
      );
      console.log(response);
      if (response.status === 200) {
        setStatus(newStatus);
        alert(response.data.status);
      }
    } catch (error) {
      console.log(error);
    }
  };


 return (
  <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
    <div className="bg-gray-200 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="text-lg font-bold font-serif">Order #{order.id}</h2>
        <p className="text-gray-600 text-sm">Placed on {order.created_at}</p>
      </div>
      <div className="flex gap-4">
        {user.is_staff || user.groups?.includes("seller") ? (
          <select
            value={status}
            onChange={handleStatusChange}
            className="px-2 py-2 rounded-full text-white text-sm font-medium bg-violet-400"
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
          </select>
        ) : (
          <span className="px-3 py-2 rounded-full bg-red-300 text-white text-base font-semibold">
            {order.status}
        </span>

        )}
        {order.status !== "Delivered" &&
          order.status !== "Canceled" &&
          !user.is_staff && (
            <button
              onClick={() => onCancel(order.id)}
              className="text-gray-600 hover:underline"
            >
              Cancel
            </button>
          )}
      </div>
    </div>

    <div className="p-4">
        <h3 className="font-medium text-lg mb-4 text-center text-lime-700 font-serif">Order Items</h3>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1 overflow-x-auto">
            <OrderTable items={order.items} />
            </div>

            <div className="w-full md:w-56 border p-4 rounded-md shadow-sm bg-stone-200">
            <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${order.total_price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                <span>Shipping:</span>
                <span>$0.00</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2 text-gray-900">
                <span>Total:</span>
                <span>${order.total_price.toFixed(2)}</span>
                </div>
            </div>
            </div>
        </div>
    </div>
  </div>
);

};

export default OrderCard;