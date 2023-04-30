import React, { useEffect, useState } from 'react';
import { FRONTEND_BASE_URL } from '../../utils/config';
import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { PaymentIntent } from '@stripe/stripe-js';
import { CheckoutFormProps } from '../../types/Types';

const CheckoutForm: React.FC<CheckoutFormProps> = ({
    clientSecret,
    totalAmount,
}) => {
    const stripe = useStripe();
    const elements = useElements();

    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string | null>('');
    const [isLoading, setIsLoading] = useState(false);
    const [paymentAttempted, setpaymentAttempted] = useState(false);

    useEffect(() => {
        if (!stripe || !clientSecret) {
            setMessage(null);
            setEmail('');
            return;
        }

        const retrievePaymentIntentStatus = async () => {
            setpaymentAttempted(false);
            try {
                const result = await stripe.retrievePaymentIntent(clientSecret);
                const paymentIntent = result.paymentIntent as PaymentIntent;

                switch (paymentIntent.status) {
                    case 'succeeded':
                        setMessage('Payment succeeded!');
                        break;
                    case 'processing':
                        setMessage('Your payment is processing.');
                        break;
                    case 'requires_payment_method':
                        if (paymentAttempted) {
                            setMessage(
                                'Your payment was not successful, please try again.'
                            );
                        }
                        break;
                    default:
                        setMessage('Something went wrong.');
                        break;
                }
            } catch (error) {
                console.error('Error retrieving payment intent:', error);
            }
        };

        retrievePaymentIntentStatus();
    }, [stripe, clientSecret]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            confirmParams: {
                return_url: `${FRONTEND_BASE_URL}payment-success`,
                receipt_email: email,
            },
            elements,
        });

        if (error.message) {
            setMessage(error.message);
            setIsLoading(false);
            return;
        } else {
            setMessage('An unexpected error occurred.');
        }

        setIsLoading(false);
    };

    return (
        <div className="stripe-form">
            <form id="payment-form" className="stripe" onSubmit={handleSubmit}>
                <h2 className="section-heading">Stripe Checkout Form</h2>
                <LinkAuthenticationElement id="link-authentication-element" />
                <PaymentElement id="payment-element" />
                <button
                    disabled={isLoading || !stripe || !elements}
                    id="submit"
                >
                    <span id="button-text">
                        {isLoading ? (
                            <div className="spinner" id="spinner"></div>
                        ) : (
                            `Pay now - €${totalAmount.toFixed(2)}`
                        )}
                    </span>
                </button>
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    );
};

export default CheckoutForm;
