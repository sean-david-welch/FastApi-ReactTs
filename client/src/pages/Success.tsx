import Layout from '../components/Layout';
import Loading from '../components/Loading';
import LogoHeading from '../components/navigation/LogoHeading';
import SectionHeading from '../components/navigation/SectionHeading';

import { useCart } from '../hooks/cart/useCartContext';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFetchIntent } from '../hooks/cart/useFetchIntent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const Success = () => {
    const [searchParams] = useSearchParams();
    const paymentIntentId = searchParams.get('payment_intent') || '';
    const { clearCart } = useCart();

    const {
        data: paymentDetails,
        isLoading,
        error,
    } = useFetchIntent(paymentIntentId);

    useEffect(() => {
        if (isLoading) {
            clearCart();
        }
    }, [isLoading, clearCart]);

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    if (error) {
        return <div>Error: {(error as Error).message}</div>;
    }

    return (
        <Layout>
            <section id="success">
                <SectionHeading
                    headingText="Payment Successful"
                    buttonLabel="Continue Shopping"
                    buttonUrl="/Shop"
                    buttonIcon={
                        <FontAwesomeIcon icon={faArrowRight} className="icon" />
                    }
                />
                <div className="success-message">
                    <LogoHeading headingText="Thank you for your order!" />
                    <p>
                        Customer Details:{' '}
                        {paymentDetails?.payment_intent.shipping.name}
                    </p>
                    <p>
                        Customer Address:{' '}
                        {paymentDetails?.payment_intent.shipping.address.line1}{' '}
                        {paymentDetails?.payment_intent.shipping.address.line2}{' '}
                        {paymentDetails?.payment_intent.shipping.address.city}{' '}
                        {paymentDetails?.payment_intent.shipping.address.state}{' '}
                        {
                            paymentDetails?.payment_intent.shipping.address
                                .postal_code
                        }{' '}
                        {
                            paymentDetails?.payment_intent.shipping.address
                                .country
                        }
                    </p>
                    <p>
                        Amount: €
                        {paymentDetails?.payment_intent.amount.toFixed(2) / 100}
                    </p>
                    <p>
                        Email Address:{' '}
                        {paymentDetails?.payment_intent.receipt_email}
                    </p>
                    <p>
                        Currency:{' '}
                        {paymentDetails?.payment_intent.currency.toUpperCase()}
                    </p>
                    <p>
                        Payment Status:{' '}
                        {paymentDetails?.payment_intent.status
                            .charAt(0)
                            .toUpperCase() +
                            paymentDetails?.payment_intent.status.slice(1)}
                    </p>
                </div>
            </section>
        </Layout>
    );
};

export default Success;
