import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { usePaymentIntent } from '../../hooks/cart/usePaymentIntent';

const { clientSecret, stripePromise, options, updateClientSecret } =
    usePaymentIntent();

{
    clientSecret && (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm
                key={clientSecret}
                clientSecret={clientSecret}
                totalAmount={total}
                updateClientSecret={updateClientSecret}
            />
        </Elements>
    );
}
