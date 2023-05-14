import { FRONTEND_BASE_URL } from '../../utils/config';
import { PaymentIntent } from '@stripe/stripe-js';
import { UsePaymentProps } from '../../types/Types';
import { useState, useEffect } from 'react';

const usePaymentProcessor = ({
    stripe,
    elements,
    clientSecret,
    email,
    setEmail,
    address,
    setAddress,
}: UsePaymentProps) => {
    const [message, setMessage] = useState<string | null>('');
    const [isLoading, setIsLoading] = useState(false);
    const [paymentAttempted, setpaymentAttempted] = useState(false);

    useEffect(() => {
        setAddress({
            line1: '',
            line2: '',
            city: '',
            state: '',
            postal_code: '',
            country: '',
        });
    }, []);

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

        try {
            if (address) {
                const { error: stripeError } = await stripe.confirmPayment({
                    confirmParams: {
                        return_url: `${FRONTEND_BASE_URL}payment-success`,
                        receipt_email: email,
                        shipping: {
                            name: email,
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
        setEmail,
        message,
        address,
        setAddress,
        isLoading,
        handleSubmit,
    };
};

export default usePaymentProcessor;
