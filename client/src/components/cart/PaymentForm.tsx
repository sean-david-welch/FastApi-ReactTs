import { PaymentElement } from '@stripe/react-stripe-js';
import { PaymentFormProps } from '../../Types/CartTypes';
import LogoHeading from '../navigation/LogoHeading';

const PaymentForm: React.FC<PaymentFormProps> = ({
    stripe,
    elements,
    isLoading,
    totalAmount,
    handleSubmit,
}) => {
    return (
        <form id="payment-form" className="stripe" onSubmit={handleSubmit}>
            <LogoHeading headingText={'Primal Formulas Checkout'} />
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? (
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
