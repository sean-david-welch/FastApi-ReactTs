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

    console.log('success page', paymentIntentId);

    const {
        data: paymentDetails,
        isLoading,
        error,
    } = useFetchIntent(paymentIntentId);

    useEffect(() => {
        clearCart();
    }, [clearCart]);

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
                    <p>Payment Intent ID: {paymentIntentId}</p>
                    <p>
                        Amount: €
                        {paymentDetails?.payment_intent.amount.toFixed(2) / 100}
                    </p>
                    <p>
                        Currency:{' '}
                        {paymentDetails?.payment_intent.currency.toUpperCase()}
                    </p>
                    <p>
                        Redirect Status:{' '}
                        {paymentDetails?.payment_intent.status.toUpperCase()}
                    </p>
                </div>
            </section>
        </Layout>
    );
};

export default Success;
