"use client";
import React, { useEffect, useState } from "react";
import { getAllOrders } from "../../api/orderApi.js";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Order Management
          </h1>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">All Orders</h2>

          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                    Order ID
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                    Customer
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                    Address
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                    Items
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                    Total
                  </th>
                  <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase">
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
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {order._id}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {order.user?.firstName} <br />
                      <span className="text-xs text-gray-500">
                        {order.user?.email}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {order.address?.fullName}, {order.address?.address},{" "}
                      {order.address?.city} ({order.address?.phone})
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {order.items.map((item, index) => (
                        <div key={index}>
                            <img
        src={item.product?.imageUrl} 
        alt={item.product?.name}
        className="w-8 h-8 rounded object-cover border"
      />
                          {item.product?.name} x {item.quantity},
                          
                        </div>
                      ))}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                      ${order.totalPrice}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="text-red-600 hover:text-red-900 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default Orders;
