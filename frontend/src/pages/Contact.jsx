import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 border-t'>
          <Title text1={'CONTACT'} text2={'AURA'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[400px]' src={assets.contact_img} alt="Contact us at Aura" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Labo</p>
          <p className='text-gray-500'>123 Serenity Lane <br /> Suite 101, Montreal, QC, Canada</p>
          <p className='text-gray-500'>Tel: (415) 555-0420 <br /> Email: contact@aura.com</p>
      
        
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default Contact
