import {
    PaymentElement,
    LinkAuthenticationElement,
} from '@stripe/react-stripe-js';
import { Stripe, StripeElements } from '@stripe/stripe-js';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

interface PaymentFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    email: string;
    setEmail: (email: string) => void;
    isLoading: boolean;
    stripe: Stripe | null;
    elements: StripeElements | null;
    totalAmount: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
    handleSubmit,
    isLoading,
    stripe,
    elements,
    totalAmount,
}) => {
    return (
        <form id="payment-form" className="stripe" onSubmit={handleSubmit}>
            <Link to="/">
                <img src={logo} id="logo" alt="Logo" />
            </Link>

            <h2 className="section-heading">Primal Formulas Checkout</h2>
            <LinkAuthenticationElement id="link-authentication-element" />
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
