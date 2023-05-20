import { PaymentFormProps } from '../../Types/CartTypes';
import {
    useStripe,
    useElements,
    PaymentElement,
    LinkAuthenticationElement,
    Elements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLIC_KEY } from '../../utils/config';
import usePaymentProcessor from '../../hooks/cart/usePaymentProcessor';

import LogoHeading from '../navigation/LogoHeading';

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const PaymentForm: React.FC<PaymentFormProps> = ({ totalAmount }) => {
    const stripe = useStripe();
    const elements = useElements();

    const {
        handlePayment,
        isLoading: paymentLoading,
        options,
    } = usePaymentProcessor({
        stripe,
        elements,
    });

    return (
        <>
            <Elements options={options} stripe={stripePromise}>
                <form
                    id="payment-form"
                    className="stripe"
                    onSubmit={handlePayment}
                >
                    <LogoHeading headingText={'Primal Formulas Checkout'} />
                    <LinkAuthenticationElement id="link-element" />
                    <PaymentElement id="payment-element" />
                    <button
                        disabled={paymentLoading || !stripe || !elements}
                        id="submit"
                    >
                        <span id="button-text">
                            {paymentLoading ? (
                                <div className="spinner" id="spinner"></div>
                            ) : (
                                `Pay now - €${totalAmount.toFixed(2)}`
                            )}
                        </span>
                    </button>
                </form>
            </Elements>
        </>
    );
};

export default PaymentForm;
