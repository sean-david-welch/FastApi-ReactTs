import { useState, useEffect } from 'react';
import { PaymentIntent } from '@stripe/stripe-js';
import { FRONTEND_BASE_URL } from '../../utils/config';
import { Stripe, StripeElements } from '@stripe/stripe-js';

interface UsePaymentProps {
    stripe: Stripe | null;
    elements: StripeElements | null;
    clientSecret: string | null;
}

const usePaymentProcessor = ({
    stripe,
    elements,
    clientSecret,
}: UsePaymentProps) => {
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
            setMessage('Payment successfully processed. Redirecting...');
        }

        setIsLoading(false);
    };

    return { email, setEmail, message, isLoading, handleSubmit };
};

export default usePaymentProcessor;
