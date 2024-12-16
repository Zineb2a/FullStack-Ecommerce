import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='mt-40'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm'>

        {/* Logo and Description */}
        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="Aura logo" />
            <p className='w-full md:w-2/3 text-gray-600'>
              Aura brings you the finest in handcrafted soaps, candles, and wellness products. 
            </p>
        </div>

        {/* Company Links */}
        <div>
            <p className='text-xl font-medium mb-5'>AURA</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>
                    <Link to='/' className='hover:text-black transition-colors'>Home</Link>
                </li>
                <li>
                    <Link to='/about' className='hover:text-black transition-colors'>About Us</Link>
                </li>
                <li>
                    <Link to='/delivery' className='hover:text-black transition-colors'>Delivery Information</Link>
                </li>
                <li>
                    <Link to='/privacy' className='hover:text-black transition-colors'>Privacy Policy</Link>
                </li>
            </ul>
        </div>

        {/* Contact Information */}
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+1-212-456-7890</li>
                <li>
                    <a href="mailto:contact@aura.com" className='hover:text-black transition-colors'>contact@aura.com</a>
                </li>
            </ul>
        </div>

      </div>

      {/* Social Media Links */}
      <div className='flex justify-center gap-6 my-6'>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className='text-gray-600 hover:text-black transition-colors'>
              <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className='text-gray-600 hover:text-black transition-colors'>
              <i className="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className='text-gray-600 hover:text-black transition-colors'>
              <i className="fab fa-twitter"></i>
          </a>
      </div>

      {/* Copyright Section */}
      <div>
          <hr />
          <p className='py-5 text-sm text-center'>© 2024 Aura - All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
