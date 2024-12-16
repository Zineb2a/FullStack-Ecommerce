import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

    return (
        <div className='w-full'>
            <div className='text-2xl mb-4'>
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                {/* Subtotal Section */}
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency} {getCartAmount()}.00</p>
                </div>
                <hr />

                {/* Shipping Fee Section */}
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{currency} {delivery_fee}.00</p>
                </div>
                <hr />

                {/* Total Amount Section */}
                <div className='flex justify-between font-semibold text-lg'>
                    <b>Total</b>
                    <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</b>
                </div>
            </div>
        </div>
    );
}

export default CartTotal;
