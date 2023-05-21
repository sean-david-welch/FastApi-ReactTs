import { useCart } from '../../hooks/cart/useCartContext';
import { PaymentIntentData } from '../../Types/CartTypes';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { STRIPE_PUBLIC_KEY } from '../../utils/config';

import Loading from '../Loading';
import PaymentForm from './PaymentForm';
import usePaymentIntent from '../../hooks/cart/usePaymentIntent';

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const CheckoutPage: React.FC = () => {
    const { cart, calculateTotalAmount } = useCart();

    const { options, clientSecret, isFetchingClientSecret, error } =
        usePaymentIntent();

    const totalAmount = calculateTotalAmount(cart as PaymentIntentData['cart']);

    return (
        <div className="stripe-form">
            {clientSecret ? (
                <Elements options={options} stripe={stripePromise}>
                    <PaymentForm
                        key={clientSecret}
                        clientSecret={clientSecret}
                        totalAmount={totalAmount}
                    />
                </Elements>
            ) : isFetchingClientSecret ? (
                <Loading />
            ) : error ? (
                <div>Error: {(error as any).message}</div>
            ) : null}
        </div>
    );
};

export default CheckoutPage;
