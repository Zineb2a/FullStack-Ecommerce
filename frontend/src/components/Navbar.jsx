import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, setToken, setCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    navigate('/login'); // Use React Router navigation
  };

  const handleNavigation = (path) => {
    if (path === '/collection') {
      // Force refresh for the Collection page
      window.location.href = path;
    } else {
      // Use React Router for all other routes
      navigate(path);
    }
  };

  const handleSearchClick = (event) => {
    event.preventDefault(); // Prevent default action to avoid refresh
    setShowSearch(true);
    navigate('/collection'); // Navigate to collection without refreshing
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* Logo */}
      <img
        onClick={() => handleNavigation('/')}
        src={assets.logo}
        className="w-36 cursor-pointer"
        alt="Aura logo"
      />

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item, index) => (
          <li
            key={index}
            className="flex flex-col items-center gap-1 cursor-pointer"
            onClick={() => handleNavigation(`/${item.toLowerCase()}`)}
          >
            <p>{item}</p>
          </li>
        ))}
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <img
          onClick={handleSearchClick}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />

        {/* Profile Icon and Dropdown */}
        <div className="group relative">
          <img
            onClick={() => handleNavigation('/profile')}
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="Profile"
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p
                onClick={() => handleNavigation('/profile')}
                className="cursor-pointer hover:text-black"
              >
                My Profile
              </p>
              <p
                onClick={() => handleNavigation('/orders')}
                className="cursor-pointer hover:text-black"
              >
                Orders
              </p>
              <p onClick={logout} className="cursor-pointer hover:text-black">
                Logout
              </p>
            </div>
          </div>
        </div>

        {/* Cart Icon */}
        <div onClick={() => handleNavigation('/cart')} className="relative cursor-pointer">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </div>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      {/* Sidebar Menu for Small Screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? 'w-full' : 'w-0'
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="Back" />
            <p>Back</p>
          </div>
          {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item, index) => (
            <p
              key={index}
              onClick={() => {
                setVisible(false);
                handleNavigation(`/${item.toLowerCase()}`);
              }}
              className="py-2 pl-6 border cursor-pointer"
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
