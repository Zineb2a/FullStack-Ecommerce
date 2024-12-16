import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="Exchange Policy Icon" />
        <p className='font-semibold'>Thoughtful Exchanges</p>
        <p className='text-gray-500'>Exchanges are available within 7 days for unused items in original packaging.</p>
      </div>
      
      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="Return Policy Icon" />
        <p className='font-semibold'>Selective Returns</p>
        <p className='text-gray-500'>As each piece is handmade, we accept returns on a case-by-case basis to ensure quality for all customers.</p>
      </div>
      
      <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5' alt="Customer Support Icon" />
        <p className='font-semibold'>Personalized Support</p>
        <p className='text-gray-500'>Our support team is here to help with any questions. Reach out to us 24/7.</p>
      </div>

    </div>
  );
}

export default OurPolicy;
