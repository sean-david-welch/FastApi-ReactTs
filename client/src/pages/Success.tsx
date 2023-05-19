import Layout from '../components/Layout';
import logo from '../assets/logo.png';

import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../hooks/cart/useCartContext';
import { Link } from 'react-router-dom';
import { useGetPaymentIntent } from '../hooks/cart/useGetIntent';
import Loading from '../components/Loading';

import SectionHeading from '../components/navigation/SectionHeading';
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
    } = useGetPaymentIntent(paymentIntentId);

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    if (isLoading) {
        console.log('Loading Success Page...');
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
                    <Link to="/">
                        <img src={logo} id="logo" alt="Logo" />
                    </Link>
                    <h1 className="section-heading">Payment Details:</h1>
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
