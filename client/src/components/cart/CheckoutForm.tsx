import { useState } from 'react';
import { useCart } from '../../hooks/cart/useCartContext';
import { PaymentIntentData } from '../../Types/CartTypes';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';

const CheckoutForm: React.FC = () => {
    const { cart, calculateTotalAmount } = useCart();
    const totalAmount = calculateTotalAmount(cart as PaymentIntentData['cart']);
    const [isAddressFormSubmitted, setIsAddressFormSubmitted] = useState(false);

    const handleAddressFormSubmit = () => {
        setIsAddressFormSubmitted(true);
    };

    return (
        <div className="stripe-form">
            <AddressForm onSubmit={handleAddressFormSubmit} />
            {isAddressFormSubmitted && (
                <PaymentForm totalAmount={totalAmount} />
            )}
        </div>
    );
};

export default CheckoutForm;
