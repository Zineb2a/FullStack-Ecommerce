import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa'; // Import the cart icon from react-icons

const ProductItem = ({ id, image, name, price }) => {
  const { currency, addToCart } = useContext(ShopContext);

  const handleQuickAdd = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the icon
    addToCart(id, 'Default');
  };

  return (
    <Link
      to={`/product/${id}`}
      className="relative group bg-white border rounded-md overflow-hidden shadow-sm hover:shadow-md transition"
      style={{ width: '180px' }}
    >
      {/* Product Image */}
      <div className="relative">
        <img
          src={image?.[0] || 'https://via.placeholder.com/150'}
          alt={name}
          className="w-full h-36 object-cover"
        />
        {/* Add to Cart Icon */}
        <button
          onClick={handleQuickAdd}
          className="absolute top-2 right-2 bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
        >
          <FaCartPlus />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-3 text-center">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-sm text-gray-600">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
