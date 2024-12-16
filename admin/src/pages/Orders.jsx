import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error fetching orders');
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error('Error updating order status');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className='p-5'>
      <h3 className='text-2xl font-semibold mb-4'>Orders Management</h3>
      <div className='grid gap-4'>

        {orders.map((order, index) => (
          <div
            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 p-5 border rounded-lg shadow-sm text-xs sm:text-sm text-gray-700 bg-white'
            key={index}
          >
            {/* Order Icon */}
            <img className='w-12' src={assets.parcel_icon} alt="Parcel icon" />

            {/* Order Details */}
            <div>
              <div>
                {order.items.map((item, idx) => (
                  <p className='py-0.5' key={idx}>
                    {item.name} x {item.quantity} <span>{item.size}</span>{idx < order.items.length - 1 && ','}
                  </p>
                ))}
              </div>
              <p className='mt-3 font-medium'>{order.address.firstName} {order.address.lastName}</p>
              <p>{order.address.street}</p>
              <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
              <p>{order.address.phone}</p>
            </div>

            {/* Payment & Date Info */}
            <div>
              <p className='text-sm sm:text-base'>Items: {order.items.length}</p>
              <p className='mt-3'>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Order Amount */}
            <p className='text-lg font-semibold text-center text-gray-800'>
              {currency}{order.amount}
            </p>

            {/* Status Dropdown */}
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className='p-2 bg-gray-50 border border-gray-300 rounded-md font-semibold text-gray-700 cursor-pointer'
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
