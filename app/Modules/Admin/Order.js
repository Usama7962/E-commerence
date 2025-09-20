"use client";
import React, { useEffect, useState } from "react";
import { getAllOrders, deleteOrder } from "../../api/orderApi.js";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal ke liye states
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ✅ Fetch Orders
  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Order
  const handleDelete = async (orderId) => {
    try {
      await deleteOrder(orderId);
      setOrders((prev) => prev.filter((o) => o._id !== orderId)); // frontend se bhi remove
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        <span className="ml-3 text-lg font-semibold">Loading orders...</span>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900">
            Order Management
          </h1>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 overflow-x-auto">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            All Orders
          </h2>

          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-4 sm:px-6 text-left font-medium text-gray-500 uppercase text-xs sm:text-sm">
                      Order ID
                    </th>
                    <th className="py-3 px-4 sm:px-6 text-left font-medium text-gray-500 uppercase text-xs sm:text-sm">
                      Customer
                    </th>
                    <th className="py-3 px-4 sm:px-6 text-left font-medium text-gray-500 uppercase text-xs sm:text-sm">
                      Total
                    </th>
                    <th className="py-3 px-4 sm:px-6 text-right font-medium text-gray-500 uppercase text-xs sm:text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-3 px-4 sm:px-6 text-gray-700 break-all">
                        {order._id}
                      </td>
                      <td className="py-3 px-4 sm:px-6 text-gray-500">
                        {order.user?.firstName} <br />
                        <span className="text-xs text-gray-500">
                          {order.user?.email}
                        </span>
                      </td>
                      <td className="py-3 px-4 sm:px-6 font-semibold text-gray-900">
                        ${order.totalPrice}
                      </td>
                      <td className="py-3 px-4 sm:px-6 text-right">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowModal(true);
                          }}
                          className="bg-indigo-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-xs sm:text-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(order._id)}
                          className="ml-2 bg-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 text-xs sm:text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto relative">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Order Details</h2>

            <h3 className="font-semibold text-sm sm:text-base">Address</h3>
            <p className="text-gray-700 mb-4 text-sm sm:text-base">
              {selectedOrder.address?.fullName},{" "}
              {selectedOrder.address?.address}, {selectedOrder.address?.city} (
              {selectedOrder.address?.phone})
            </p>

            <h3 className="font-semibold text-sm sm:text-base">Items</h3>
            <ul className="space-y-3 mb-4">
              {selectedOrder.items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-sm sm:text-base"
                >
                  <img
                    src={item.product?.imageUrl}
                    alt={item.product?.name}
                    className="w-10 h-10 sm:w-14 sm:h-14 rounded object-cover border"
                  />
                  <span>
                    {item.product?.name} × {item.quantity} = $
                    {item.product.price}
                  </span>
                </li>
              ))}
            </ul>

            <p className="font-bold text-sm sm:text-base">
              Total: ${selectedOrder.totalPrice}
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
