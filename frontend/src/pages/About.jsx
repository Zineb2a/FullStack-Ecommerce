import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div className='px-6 md:px-12 lg:px-20'>

      {/* About Us Title */}
      <div className='text-2xl text-center pt-12 border-t'>
          <Title text1='ABOUT' text2='US' />
      </div>

      {/* About Section */}
      <div className='my-12 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px] rounded-lg shadow-md' src={assets.about_img} alt="About us" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-700'>
              <p className='leading-relaxed'>
                Aura was born out of a passion for creating handmade, natural products that elevate the simple joys of everyday life. We envisioned a space where people can discover unique, high-quality scented soaps, candles, and other artisanal creations, all crafted with love and attention to detail.
              </p>
              <p className='leading-relaxed'>
                Since our beginning, we've dedicated ourselves to curating products that bring warmth and tranquility to any space. From soothing candles to gentle, naturally scented soaps, each piece embodies the essence of artisanal craftsmanship and tells its own story.
              </p>
              <b className='text-gray-800 text-lg'>Our Mission</b>
              <p className='leading-relaxed'>
                Our mission is to fill your home with calm and beauty through our handcrafted products. From selecting your favorite items to the moment they arrive at your door, we’re here to ensure a seamless and delightful shopping experience, backed by our attentive customer service team.
              </p>
          </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='text-xl py-6'>
          <Title text1='WHY' text2='CHOOSE US' />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20 gap-6 md:gap-8'>
          <div className='border rounded-lg p-8 sm:p-12 flex flex-col gap-5 shadow-sm'>
            <b className='text-lg'>Artisan Quality</b>
            <p className='text-gray-600 leading-relaxed'>Each product is handcrafted with care and precision, ensuring that it meets our high standards for quality and uniqueness.</p>
          </div>
          <div className='border rounded-lg p-8 sm:p-12 flex flex-col gap-5 shadow-sm'>
            <b className='text-lg'>Natural Ingredients</b>
            <p className='text-gray-600 leading-relaxed'>We use only natural ingredients to support wellness and create a healthier, more sustainable environment.</p>
          </div>
          <div className='border rounded-lg p-8 sm:p-12 flex flex-col gap-5 shadow-sm'>
            <b className='text-lg'>Personalized Experience</b>
            <p className='text-gray-600 leading-relaxed'>Our dedicated team is here to make your experience as enjoyable and relaxing as the products we offer.</p>
          </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterBox />
      
    </div>
  );
}

export default About;
