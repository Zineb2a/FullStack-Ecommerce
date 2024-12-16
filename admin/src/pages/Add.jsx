import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [imageFiles, setImageFiles] = useState(Array(8).fill(null));
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Soap');
  const [subCategory, setSubCategory] = useState('Scented');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onImageChange = (index, file) => {
    const updatedImages = [...imageFiles];
    updatedImages[index] = file;
    setImageFiles(updatedImages);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory); // Use subCategory to match backend expectations
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));

      imageFiles.forEach((image, index) => {
        if (image) formData.append(`image${index + 1}`, image);
      });

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImageFiles(Array(8).fill(null));
        setPrice('');
        setSizes([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while adding the product');
    }
  };

  // Determine available sizes based on category
  const availableSizes = () => {
    switch (category) {
      case 'Soap':
      case 'Body Scrubs':
        return ['Small', 'Medium', 'Large'];
      case 'Candle':
      case 'Bath Bombs':
        return ['Mini', 'Standard', 'Large'];
      case 'Lip Balms':
        return ['Standard'];
      case 'Essential Oils':
        return ['10ml', '30ml', '50ml'];
      case 'Gift Sets':
        return ['Single', 'Set of 3', 'Set of 5'];
      default:
        return [];
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-6'>
      {/* Image Upload Section */}
      <div>
        <p className='mb-2'>Upload Images</p>
        <div className='flex gap-2 flex-wrap'>
          {imageFiles.map((image, index) => (
            <label key={index} htmlFor={`image${index + 1}`} className="flex flex-col items-center">
              <img
                className='w-20 h-20 object-cover border rounded cursor-pointer'
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt={`Upload ${index + 1}`}
              />
              <input
                type='file'
                id={`image${index + 1}`}
                hidden
                onChange={(e) => onImageChange(index, e.target.files[0])}
              />
              <p className='text-xs mt-1'>{`Image ${index + 1}`}</p>
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className='w-full'>
        <label className='block mb-2 font-medium'>Product Name</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full max-w-[500px] px-3 py-2 border rounded-md'
          placeholder='Enter product name'
          required
        />
      </div>

      {/* Product Description */}
      <div className='w-full'>
        <label className='block mb-2 font-medium'>Product Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full max-w-[500px] px-3 py-2 border rounded-md'
          placeholder='Write product description'
          required
        />
      </div>

      {/* Category, SubCategory, and Price */}
      <div className='flex flex-col sm:flex-row gap-4 w-full sm:gap-8'>
        <div>
          <label className='block mb-2 font-medium'>Product Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full px-3 py-2 border rounded-md'
          >
            <option value='Soap'>Soap</option>
            <option value='Candle'>Candle</option>
            <option value='Bath Bombs'>Bath Bombs</option>
            <option value='Body Scrubs'>Body Scrubs</option>
            <option value='Lip Balms'>Lip Balms</option>
            <option value='Essential Oils'>Essential Oils</option>
            <option value='Gift Sets'>Gift Sets</option>
          </select>
        </div>

        <div>
          <label className='block mb-2 font-medium'>Product SubCategory</label>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className='w-full px-3 py-2 border rounded-md'
          >
            <option value='Scented'>Scented</option>
            <option value='Unscented'>Unscented</option>
            <option value='Organic'>Organic</option>
            <option value='Moisturizing'>Moisturizing</option>
            <option value='Exfoliating'>Exfoliating</option>
            <option value='Aromatherapy'>Aromatherapy</option>
            <option value='Relaxation'>Relaxation</option>
          </select>
        </div>

        <div>
          <label className='block mb-2 font-medium'>Price</label>
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='w-full px-3 py-2 border rounded-md'
            placeholder='Enter price'
          />
        </div>
      </div>

      {/* Product Sizes */}
      <div>
        <p className='mb-2 font-medium'>Product Sizes</p>
        <div className='flex gap-3'>
          {availableSizes().map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
                )
              }
              className={`px-3 py-1 cursor-pointer rounded-md ${
                sizes.includes(size) ? 'bg-pink-200' : 'bg-slate-200'
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className='flex items-center gap-2'>
        <input
          type='checkbox'
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
          id='bestseller'
        />
        <label htmlFor='bestseller' className='cursor-pointer'>
          Add to bestseller
        </label>
      </div>

      {/* Submit Button */}
      <button type='submit' className='w-28 py-3 bg-black text-white rounded-md mt-4'>
        Add Product
      </button>
    </form>
  );
};

export default Add;
