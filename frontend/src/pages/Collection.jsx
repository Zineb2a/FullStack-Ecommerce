import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  // Toggle Category Selection
  const toggleCategory = (e) => {
    setCategory((prev) =>
      prev.includes(e.target.value)
        ? prev.filter((item) => item !== e.target.value)
        : [...prev, e.target.value]
    );
  };

  // Toggle SubCategory Selection
  const toggleSubCategory = (e) => {
    setSubCategory((prev) =>
      prev.includes(e.target.value)
        ? prev.filter((item) => item !== e.target.value)
        : [...prev, e.target.value]
    );
  };

  // Apply Filters to Products
  const applyFilter = () => {
    let filtered = products;

    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((item) => subCategory.includes(item.subCategory));
    }

    setFilterProducts(filtered);
  };

  // Sort Filtered Products
  const sortProducts = () => {
    let sorted = [...filterProducts];

    if (sortType === 'low-high') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      sorted.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(sorted);
  };

  // Reapply Filters When Dependencies Change
  useEffect(() => {
    applyFilter();
  }, [products, category, subCategory, search, showSearch]);

  // Re-sort Products When Sort Type Changes
  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt="Toggle filters"
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? '' : 'hidden'
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORY</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {['Soap', 'Candle', 'Bath Bombs', 'Body Scrubs', 'Lip Balms', 'Essential Oils', 'Gift Sets'].map(
              (category) => (
                <p className="flex gap-2" key={category}>
                  <input
                    className="w-3"
                    type="checkbox"
                    value={category}
                    onChange={toggleCategory}
                  />
                  {category}
                </p>
              )
            )}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? '' : 'hidden'
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {['Scented', 'Unscented', 'Organic', 'Moisturizing', 'Exfoliating', 'Aromatherapy', 'Relaxation'].map(
              (type) => (
                <p className="flex gap-2" key={type}>
                  <input
                    className="w-3"
                    type="checkbox"
                    value={type}
                    onChange={toggleSubCategory}
                  />
                  {type}
                </p>
              )
            )}
          </div>
        </div>
      </div>

      {/* Right Side (Product Grid) */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="OUR" text2="COLLECTION" />
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {filterProducts.map((item) => (
    <ProductItem
      key={item._id}
      id={item._id}
      name={item.name}
      image={item.image}
      price={item.price}
    />
  ))}
</div>

      </div>
    </div>
  );
};

export default Collection;
