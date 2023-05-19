import { PaymentFormProps } from '../../Types/CartTypes';
import {
    useElements,
    useStripe,
    PaymentElement,
    LinkAuthenticationElement,
} from '@stripe/react-stripe-js';

import usePaymentProcessor from '../../hooks/cart/usePaymentProcessor';
import LogoHeading from '../navigation/LogoHeading';

const PaymentForm: React.FC<PaymentFormProps> = ({
    totalAmount,
    clientSecret,
}) => {
    const stripe = useStripe();
    const elements = useElements();

    const { handlePayment, isLoading: paymentLoading } = usePaymentProcessor({
        stripe,
        elements,
        clientSecret,
    });
    return (
        <form id="payment-form" className="stripe" onSubmit={handlePayment}>
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
    );
};

export default PaymentForm;
