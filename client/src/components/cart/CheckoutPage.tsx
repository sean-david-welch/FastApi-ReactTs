import { useCart } from '../../hooks/cart/useCartContext';
import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { Address } from '../../Types/CartTypes';
import { CartItem } from '../../Types/CartTypes';
import { useCustomer } from '../../hooks/cart/useCustomerContext';
import usePaymentIntent from '../../hooks/cart/useFetchIntent';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Loading from '../Loading';

const CheckoutPage: React.FC = () => {
    const cartContext = useCart();
    const { setCustomer } = useCustomer();
    const [addressFormSubmitted, setAddressFormSubmitted] = useState(false);
    const [fetchingClientSecret, setFetchingClientSecret] = useState(false);

    const { clientSecret, stripePromise, options } =
        usePaymentIntent(addressFormSubmitted);

    const handleSubmit = (data: {
        name: string;
        email: string;
        address: Address;
    }) => {
        setCustomer(prev => ({
            ...prev,
            email: data.email,
            address: data.address,
        }));
        setFetchingClientSecret(true);
        setAddressFormSubmitted(true);
    };

    const calculateTotalAmount = (cart: CartItem[]) => {
        return cart.reduce(
            (acc: number, item: CartItem) => acc + item.price * item.quantity,
            0
        );
    };

    const totalAmount = calculateTotalAmount(cartContext.cart);

    return (
        <div className="stripe-form">
            {addressFormSubmitted ? (
                clientSecret ? (
                    <Elements options={options} stripe={stripePromise}>
                        <PaymentForm
                            clientSecret={clientSecret}
                            totalAmount={totalAmount}
                        />
                    </Elements>
                ) : (
                    fetchingClientSecret && <Loading />
                )
            ) : (
                <AddressForm onSubmit={handleSubmit} />
            )}
        </div>
    );
};

export default CheckoutPage;
