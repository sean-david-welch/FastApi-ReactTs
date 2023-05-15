import { FRONTEND_BASE_URL } from '../../utils/config';
import { useCustomer } from './useCustomerContext';
import { PaymentIntent } from '@stripe/stripe-js';
import { UsePaymentProps } from '../../Types/CartTypes';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const usePaymentProcessor = ({
    stripe,
    elements,
    clientSecret,
}: UsePaymentProps) => {
    const [message, setMessage] = useState<string | null>('');
    const [isLoading, setIsLoading] = useState(false);
    const { customer } = useCustomer();
    const navigate = useNavigate();

    useEffect(() => {
        const retrievePaymentIntentStatus = async () => {
            if (!stripe || !clientSecret) return;

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
                        setMessage(
                            'Your payment was not successful, please try again.'
                        );
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

    const handlePayment = async () => {
        console.log('handlePayment called');

        if (!stripe || !elements || !clientSecret || !customer?.email) {
            console.log(
                'Stripe, elements, clientSecret, or email is undefined'
            );
            return;
        }

        setIsLoading(true);

        try {
            console.log('Attempting to confirm payment...');
            const response = await stripe.confirmPayment({
                confirmParams: {
                    return_url: 'http://localhost:3000/payment-success/',
                    receipt_email: customer.email,
                },
                elements,
            });

            console.log('Payment confirmation response:', response);

            if (response.error) {
                setMessage(response.error.message || 'Something went wrong.');
                console.error('Payment error:', response.error);
            } else {
                setMessage('Payment successfully processed. Redirecting...');
                navigate(`${FRONTEND_BASE_URL}payment-success/`);
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            setMessage('Something went wrong.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        stripe,
        elements,
        clientSecret,
        email: customer?.email,
        message,
        isLoading,
        handlePayment,
    };
};

export default usePaymentProcessor;
