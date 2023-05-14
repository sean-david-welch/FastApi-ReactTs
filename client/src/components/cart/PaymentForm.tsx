import { PaymentFormProps } from '../../types/Types';
import {
    PaymentElement,
    LinkAuthenticationElement,
    AddressElement,
} from '@stripe/react-stripe-js';
import LogoHeading from '../navigation/LogoHeading';

const PaymentForm: React.FC<PaymentFormProps> = ({
    handleSubmit,
    isLoading,
    stripe,
    elements,
    totalAmount,
    onAddressChange,
}) => {
    return (
        <form id="payment-form" className="stripe" onSubmit={handleSubmit}>
            <LogoHeading headingText={'Primal Formulas Checkout'} />
            <LinkAuthenticationElement id="link-authentication-element" />
            <AddressElement
                id="address-element"
                options={{ mode: 'shipping' }}
                onChange={event => {
                    if (event.complete) {
                        onAddressChange(event.value.address as any);
                    }
                }}
            />
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
