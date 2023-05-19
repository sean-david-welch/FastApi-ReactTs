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
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { options, clientSecret, stripePromise, isFetchingClientSecret } =
        usePaymentIntent(addressFormSubmitted, formSubmitted);

    const handleSubmit = (data: {
        name: string;
        email: string;
        address: Address;
    }) => {
        console.log('handleSubmit called with data:', data);
        setCustomer(data);
        setAddressFormSubmitted(true);
        setFormSubmitted(true);
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
                            key={clientSecret}
                            clientSecret={clientSecret}
                            totalAmount={totalAmount}
                        />
                    </Elements>
                ) : (
                    isFetchingClientSecret && <Loading />
                )
            ) : (
                <AddressForm onSubmit={handleSubmit} />
            )}
        </div>
    );
};

export default CheckoutPage;
