import { PaymentFormProps } from '../../types/Types';
import { PaymentElement, AddressElement } from '@stripe/react-stripe-js';
import LogoHeading from '../navigation/LogoHeading';

const PaymentForm: React.FC<PaymentFormProps> = ({
    stripe,
    email,
    elements,
    isLoading,
    totalAmount,
    setEmail,
    handleSubmit,
    onAddressChange,
}) => {
    return (
        <form id="payment-form" className="stripe" onSubmit={handleSubmit}>
            <LogoHeading headingText={'Primal Formulas Checkout'} />
            <input
                type="email"
                value={email}
                onChange={e => setEmail(() => e.target.value)}
                // console.log('Email input changed: ', e.target.value);
                placeholder="Email address"
            />

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
