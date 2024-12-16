import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { token, backendUrl, setToken } = useContext(ShopContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ name: '', email: '' });
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    const fetchProfile = async () => {
        if (!token) {
            toast.error('You are not logged in. Redirecting...');
            navigate('/login');
            return;
        }

        try {
            console.log('Fetching profile with token:', token);
            const response = await axios.get(`${backendUrl}/api/user/profile`, {
                headers: { token },
            });

            console.log('Profile Response:', response.data);

            if (response.data.success) {
                setUserData(response.data.user);
            } else {
                toast.error(response.data.message || 'Failed to fetch profile.');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);

            if (error.response?.status === 401 || error.response?.status === 403) {
                toast.error('Session expired. Redirecting to login.');
                localStorage.removeItem('token');
                setToken('');
                navigate('/login');
            } else {
                toast.error('Failed to fetch profile. Please try again.');
            }
        } finally {
            setIsFetching(false);
        }
    };

    const updateProfile = async () => {
        if (!userData.name.trim() || !userData.email.trim()) {
            toast.error('Name and email cannot be empty.');
            return;
        }

        setLoading(true);
        try {
            const payload = { ...userData, password: password.trim() || undefined };
            const response = await axios.put(`${backendUrl}/api/user/profile`, payload, {
                headers: { token },
            });

            if (response.data.success) {
                toast.success('Profile updated successfully!');
                setPassword('');
            } else {
                toast.error(response.data.message || 'Failed to update profile.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [token]);

    if (isFetching) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="max-w-lg mx-auto my-10 bg-white shadow-lg rounded-lg">
            <h2 className="text-4xl text-center text-gray-800 pt-6">My Profile</h2>
            <p className="text-center text-gray-500 mt-2 mb-6">Manage your account settings and update your details</p>
            <div className="px-6 pb-8">
                <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-1">Your Name</label>
                    <input
                        type="text"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="Enter your name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-1">Your Email</label>
                    <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-600 font-medium mb-1">Change Your Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="Enter new password (optional)"
                    />
                </div>
                <button
                    onClick={updateProfile}
                    className={`w-full py-3 rounded-lg text-white font-bold shadow-lg transition-all ${
                        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-300 hover:bg-blue-200'
                    }`}
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
            </div>
        </div>
    );
};

export default Profile;
