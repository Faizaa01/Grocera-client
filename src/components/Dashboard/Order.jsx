import { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";

const statusColors = {
  Pending: "badge-warning  opacity-60",
  Processing: "badge-neutral opacity-60",
  Shipped: "badge-success opacity-60",
  "Out for Delivery": "badge-primary opacity-60",
  Delivered: "badge-info opacity-60",
  Canceled: "badge-error opacity-60",
};

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await authApiClient.get("/orders/");
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="mt-10 card shadow-md rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-rose-100 px-6 py-4">
        <h3 className="text-lg font-semibold">Recent Orders</h3>
      </div>

      {/* Body */}
      <div className="card-body bg-white p-4">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-left text-gray-600 text-sm uppercase border-b">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer ID</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Amount</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="font-medium">#{order.id}</td>
                    <td>{order.user || "N/A"}</td>
                    <td>
                      <span
                        className={`badge ${
                          statusColors[order.status] || "badge-ghost"
                        } badge-outline rounded-full px-3 py-1 text-xs`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      {new Date(order.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="font-semibold text-gray-900">
                      ${parseFloat(order.total_price).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
