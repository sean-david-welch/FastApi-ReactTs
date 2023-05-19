import { useCart } from '../../hooks/cart/useCartContext';
import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentIntentData } from '../../Types/CartTypes';
import { useCustomer } from '../../hooks/cart/useCustomerContext';
import usePaymentIntent from '../../hooks/cart/useFetchIntent';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Loading from '../Loading';

const CheckoutPage: React.FC = () => {
    const { cart, calculateTotalAmount } = useCart();
    const [showAddressForm, setShowAddressForm] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { setCustomer } = useCustomer();

    const { options, clientSecret, stripePromise, isFetchingClientSecret } =
        usePaymentIntent(formSubmitted);

    const handleSubmit = (data: PaymentIntentData['customer']) => {
        setCustomer(data);
        setFormSubmitted(true);
        setShowAddressForm(false); // Hide the AddressForm after submission
    };

    const totalAmount = calculateTotalAmount(cart as PaymentIntentData['cart']);

    return (
        <div className="stripe-form">
            {formSubmitted ? (
                clientSecret ? (
                    <Elements options={options} stripe={stripePromise}>
                        <PaymentForm
                            key={clientSecret}
                            clientSecret={clientSecret}
                            totalAmount={totalAmount}
                        />
                    </Elements>
                ) : (
                    isFetchingClientSecret && <Loading />
                )
            ) : (
                // Render the AddressForm only if showAddressForm is true
                showAddressForm && <AddressForm onSubmit={handleSubmit} />
            )}
        </div>
    );
};

export default CheckoutPage;
