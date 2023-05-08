import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCartContext } from '../hooks/cart/useCartContext';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import logo from '../assets/logo.png';

export const Success = () => {
    const [searchParams] = useSearchParams();
    const paymentIntent = searchParams.get('payment_intent');
    const paymentIntentClientSecret = searchParams.get(
        'payment_intent_client_secret'
    );
    const redirectStatus = searchParams.get('redirect_status');
    const { clearCart } = useCartContext();

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <Layout>
            <section id="success">
                <div className="success-message">
                    <Link to="/">
                        <img src={logo} id="logo" alt="Logo" />
                    </Link>
                    <h2 className="section-heading">Payment Successful</h2>
                    <p>Payment Intent ID: {paymentIntent}</p>
                    <p>
                        Payment Intent Client Secret:{' '}
                        {paymentIntentClientSecret}
                    </p>
                    <p>Redirect Status: {redirectStatus}</p>
                </div>
            </section>
        </Layout>
    );
};

export default Success;
