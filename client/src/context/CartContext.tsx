import { createContext, useState, useCallback, useEffect } from 'react';
import {
    CartItem,
    CartContextData,
    CartProviderProps,
} from '../Types/CartTypes';

export const CartContext = createContext<CartContextData>(
    {} as CartContextData
);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const clearCart = useCallback(() => {
        setCart([]);
    }, []);

    const findItemById = (id: string) =>
        cart.find(cartItem => cartItem.id === id);

    const updateQuantity = useCallback(
        (id: string, quantity: number) => {
            setCart(
                cart.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity, updated: true };
                    }
                    return item;
                })
            );
        },
        [cart]
    );

    const addToCart = useCallback(
        (item: CartItem) => {
            const existingItem = findItemById(item.id);

            if (existingItem) {
                updateQuantity(item.id, existingItem.quantity + 1);
            } else {
                setCart([...cart, item]);
            }
        },
        [cart]
    );

    const removeFromCart = useCallback(
        (id: string) => {
            setCart(cart.filter(item => item.id !== id));
        },
        [cart]
    );

    const calculateTotalAmount = (cart: CartItem[]) => {
        return cart.reduce(
            (acc: number, item: CartItem) => acc + item.price * item.quantity,
            0
        );
    };

    const value = {
        cart,
        updateQuantity,
        addToCart,
        removeFromCart,
        clearCart,
        calculateTotalAmount,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
