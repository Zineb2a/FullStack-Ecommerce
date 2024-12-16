import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  return (
    <div className='w-[20%] min-h-screen border-r border-gray-200 bg-gray-50'>
      <div className='flex flex-col gap-6 pt-10 pl-10 text-sm'>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-l-full transition-all duration-200 ${
              isActive ? 'bg-blue-100 text-blue-600' : 'bg-transparent text-gray-700 hover:bg-gray-100'
            }`
          }
          to="/add"
        >
          <img className='w-5 h-5' src={assets.add_icon} alt="Add icon" />
          <p className='hidden md:block'>Add Items</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-l-full transition-all duration-200 ${
              isActive ? 'bg-blue-100 text-blue-600' : 'bg-transparent text-gray-700 hover:bg-gray-100'
            }`
          }
          to="/list"
        >
          <img className='w-5 h-5' src={assets.order_icon} alt="Order icon" />
          <p className='hidden md:block'>List Items</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-l-full transition-all duration-200 ${
              isActive ? 'bg-blue-100 text-blue-600' : 'bg-transparent text-gray-700 hover:bg-gray-100'
            }`
          }
          to="/orders"
        >
          <img className='w-5 h-5' src={assets.order_icon} alt="Order icon" />
          <p className='hidden md:block'>Orders</p>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;
