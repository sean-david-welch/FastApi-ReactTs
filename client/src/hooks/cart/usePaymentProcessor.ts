import { FRONTEND_BASE_URL } from '../../utils/config';
import { PaymentIntent } from '@stripe/stripe-js';
import { UsePaymentProps } from '../../types/Types';
import { useState, useEffect } from 'react';

const usePaymentProcessor = ({
    email,
    stripe,
    address,
    elements,
    clientSecret,
    setEmail,
    setAddress,
}: UsePaymentProps) => {
    const [message, setMessage] = useState<string | null>('');
    const [isLoading, setIsLoading] = useState(false);
    const [paymentAttempted, setpaymentAttempted] = useState(false);

    useEffect(() => {
        if (!stripe || !clientSecret) {
            setEmail('');
            setMessage(null);
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

        if (!stripe || !elements || !clientSecret || !email) {
            return;
        }

        console.log('Email at the time of submitting: ', email);

        setIsLoading(true);

        try {
            if (address) {
                const { error: stripeError } = await stripe.confirmPayment({
                    confirmParams: {
                        return_url: `${FRONTEND_BASE_URL}payment-success`,
                        receipt_email: email,
                        shipping: {
                            name: 'Jane Doe',
                            address: address,
                        },
                    },
                    elements,
                });
                if (stripeError?.message) {
                    setMessage(stripeError.message);
                } else {
                    setMessage(
                        'Payment successfully processed. Redirecting...'
                    );
                }
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            setMessage('Something went wrong.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email,
        message,
        address,
        isLoading,
        setEmail,
        setAddress,
        handleSubmit,
    };
};

export default usePaymentProcessor;
