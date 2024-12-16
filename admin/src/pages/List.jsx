import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error fetching product list');
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error removing product');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className='mb-4 text-xl font-semibold'>All Products List</p>
      <div className='flex flex-col gap-2'>

        {/* ------- List Table Header ---------- */}

        <div className='hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr] items-center py-2 px-4 border-b bg-gray-100 text-sm font-semibold'>
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Sub-category</span>
          <span>Type</span>
          <span>Price</span>
          <span className='text-center'>Action</span>
        </div>

        {/* ------- Product List Items ---------- */}

        {list.map((item, index) => (
          <div
            className='grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr] items-center gap-4 py-2 px-4 border text-sm'
            key={index}
          >
            <img className='w-12 h-12 object-cover rounded-md' src={item.image[0]} alt={item.name} />
            <p className='truncate'>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.subCategory || '-'}</p>
            <p>{item.type || '-'}</p>
            <p>{currency}{item.price}</p>
            <button
              onClick={() => removeProduct(item._id)}
              className='text-red-600 text-center md:w-full hover:underline'
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
