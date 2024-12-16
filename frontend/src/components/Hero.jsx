import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-200'>
      
      {/* Hero Left Side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 bg-[#e2d7cc] px-8'>
            <div className='text-[#414141] text-center sm:text-left'>
                <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>
                    Welcome to AURA
                </h1>
                <p className='text-gray-500 text-sm md:text-base mt-4 max-w-md'>
                    Discover the warmth and tranquility of handcrafted, artisanal treasures designed to bring calm and comfort into your everyday moments.
                </p>
                <div className='flex items-center gap-2 justify-center sm:justify-start mt-6'>
                    <Link to='/collection'>
                        <button className='font-semibold text-sm md:text-base text-[#414141] border-b-2 border-[#414141] hover:text-gray-700 hover:border-gray-700 transition-all'>
                          Shop the Collection
                        </button>
                    </Link>
                </div>
            </div>
      </div>
      
      {/* Hero Right Side */}
      <img 
        className='w-full sm:w-1/2 object-cover' 
        src={assets.hero_img} 
        alt="Handcrafted candle from Aura's collection" 
      />
    </div>
  );
}

export default Hero;
