import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setSelectedVariant(product.variants?.[0] || null); // Default to the first variant or null
    } else {
      toast.error('Product not found!');
    }
  }, [productId, products]);

  const handleAddToCart = () => {
    if (productData.variants && !selectedVariant) {
      toast.error('Please select a variant.');
      return;
    }
    addToCart(productData._id, selectedVariant || 'Default');
    toast.success('Product added to cart!');
  };

  if (!productData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Images */}
        <div className="flex-1">
          <img
            src={productData.image?.[0] || 'https://via.placeholder.com/400'}
            alt={productData.name}
            className="w-full h-auto rounded-md"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{productData.name}</h1>
          <p className="text-gray-600 mt-2">{productData.description}</p>
          <p className="text-xl font-medium mt-4">${productData.price}</p>

          {/* Variants */}
          {productData.variants && productData.variants.length > 0 && (
            <div className="mt-4">
              <p className="font-medium">Select Variant:</p>
              <div className="flex gap-2 mt-2">
                {productData.variants.map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 rounded border ${
                      selectedVariant === variant
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            className="mt-6 bg-black text-white px-6 py-3 rounded hover:bg-gray-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
