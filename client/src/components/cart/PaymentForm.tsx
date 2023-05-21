import LogoHeading from '../navigation/LogoHeading';
import { PaymentFormProps } from '../../Types/CartTypes';
import {
    useStripe,
    useElements,
    PaymentElement,
} from '@stripe/react-stripe-js';
import usePaymentProcessor from '../../hooks/cart/usePaymentProcessor';

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
        <form
            id="payment-form"
            className="stripe"
            onSubmit={event => handlePayment(event)}
        >
            <LogoHeading headingText={'Primal Formulas Checkout'} />

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
