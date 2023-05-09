import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

export const useCart = () => {
    const { cart, updateQuantity, addToCart, removeFromCart, clearCart } =
        useContext(CartContext);

    if (
        cart === undefined ||
        updateQuantity === undefined ||
        addToCart === undefined ||
        removeFromCart === undefined ||
        clearCart === undefined
    ) {
        throw new Error('useCartContext must be used within a CartProvider');
    }

    return { cart, updateQuantity, addToCart, removeFromCart, clearCart };
};
