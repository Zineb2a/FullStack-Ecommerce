import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const NewsletterBox = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!email.trim()) {
            toast.error('Please enter a valid email.');
            return;
        }

        try {
            setLoading(true);

            // Send a POST request to backend API
            const response = await axios.post('http://localhost:4000/api/newsletter/subscribe', { email });

            if (response.data.success) {
                toast.success(response.data.message || 'Subscription successful!');
                setEmail(''); // Clear input field after success
            } else {
                toast.error(response.data.message || 'Subscription failed. Please try again.');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='text-center my-10'>
            <p className='text-2xl font-medium text-gray-800'>Subscribe to Aura & Enjoy 20% Off</p>
            <p className='text-gray-500 mt-3'>
                Join our community and stay updated with our latest handcrafted arrivals and exclusive offers.
            </p>
            <form
                onSubmit={onSubmitHandler}
                className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded-md overflow-hidden'
            >
                <input
                    className='w-full sm:flex-1 outline-none px-3 py-2'
                    type="email"
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update state on change
                    required
                />
                <button
                    type='submit'
                    className={`bg-black text-white text-xs px-6 py-3 sm:px-10 sm:py-4 ${
                        loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    disabled={loading} // Disable button during loading
                >
                    {loading ? 'Submitting...' : 'SUBSCRIBE'}
                </button>
            </form>
        </div>
    );
};

export default NewsletterBox;
