import CartItem from './CartItem';
import NavButton from '../navigation/NavButton';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { useCartContext } from '../../hooks/cart/useCartContext';
import { CartViewProps } from '../../types/Types';

const CartView: React.FC<CartViewProps> = ({ renderSectionHeading }) => {
    const [total, setTotal] = useState(0);
    const { cart, removeFromCart, updateQuantity } = useCartContext();

    useEffect(() => {
        const newTotal = cart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        setTotal(newTotal);
    }, [cart]);

    const handleRemove = (id: string) => {
        removeFromCart(id);
    };

    const handleChangeQuantity = (
        id: string,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newQuantity = parseInt(event.target.value);
        if (!isNaN(newQuantity) && newQuantity >= 1) {
            updateQuantity(id, newQuantity);
        }
    };

    return (
        <>
            {renderSectionHeading}
            {cart.length === 0 ? (
                <div className="empty-cart" />
            ) : (
                <div className="cart-view">
                    <div className="cart">
                        <ul className="cart-list-grid">
                            <h1 className="section-heading">Cart Items(s)</h1>
                            {cart.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    handleChangeQuantity={handleChangeQuantity}
                                    handleRemove={handleRemove}
                                />
                            ))}
                        </ul>
                        <div className="cart-total">
                            <h1 className="section-heading">
                                Sub-Total: €{total.toFixed(2)}
                            </h1>
                        </div>
                    </div>
                    <ul>
                        <NavButton
                            to={{
                                pathname: '/checkout',
                                state: { total },
                            }}
                            icon={
                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                    className="icon"
                                />
                            }
                        >
                            Checkout
                        </NavButton>
                    </ul>
                </div>
            )}
        </>
    );
};

export default CartView;
