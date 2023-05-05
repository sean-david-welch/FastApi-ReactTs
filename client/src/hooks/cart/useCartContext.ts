import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

export const useCartContext = () => {
    const { cart, updateQuantity, addToCart, removeFromCart } =
        useContext(CartContext);

    if (
        cart === undefined ||
        updateQuantity === undefined ||
        addToCart === undefined ||
        removeFromCart === undefined
    ) {
        throw new Error('useCartContext must be used within a CartProvider');
    }

    return { cart, updateQuantity, addToCart, removeFromCart };
};
