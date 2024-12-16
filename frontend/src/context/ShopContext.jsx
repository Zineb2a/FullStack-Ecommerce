import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        } else {
            cartData[itemId] = { [size]: 1 };
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } });
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        }
    };

    const getCartCount = () => {
        return Object.values(cartItems).reduce((total, sizes) =>
            total + Object.values(sizes).reduce((subtotal, count) => subtotal + count, 0), 0
        );
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } });
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        }
    };

    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [itemId, sizes]) => {
            const product = products.find((product) => product._id === itemId);
            if (!product) return total;

            return total + Object.entries(sizes).reduce((subtotal, [size, count]) =>
                subtotal + count * product.price, 0
            );
        }, 0);
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products.reverse());
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                toast.error('Session expired. Please log in again.');
                localStorage.removeItem('token');
                setToken('');
                navigate('/login');
            } else {
                console.error(error);
                toast.error(error.message);
            }
        }
    };

    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!token && storedToken) {
            console.log('Setting token from localStorage:', storedToken);
            setToken(storedToken);
            getUserCart(storedToken); // Ensure the cart is fetched once the token is set
        } else if (token) {
            console.log('Token already set in context:', token);
        }
    }, [token]);
    

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        setToken, token
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
