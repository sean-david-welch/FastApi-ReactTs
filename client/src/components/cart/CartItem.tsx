import React from 'react';
import { CartItemProps } from '../../Types/CartTypes';

const CartItem: React.FC<CartItemProps> = ({
    item,
    handleChangeQuantity,
    handleRemove,
}) => (
    <li className="cart-list-item" key={item.id}>
        <img src={item.image} alt={item.name} />
        <div className="cart-description">
            <h2 className="section-heading">
                {item.name}: €{Number(item.price).toFixed(2)}
            </h2>
            <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={event => handleChangeQuantity(item.id, event)}
            />
            <button
                className="btn-secondary"
                onClick={() => handleRemove(item.id)}
            >
                Remove Item
            </button>
        </div>
    </li>
);

export default CartItem;
