import Layout from '../components/Layout';
import { useSearchParams } from 'react-router-dom';

export const Success = () => {
    const [searchParams] = useSearchParams();
    const paymentIntent = searchParams.get('payment_intent');
    const paymentIntentClientSecret = searchParams.get(
        'payment_intent_client_secret'
    );
    const redirectStatus = searchParams.get('redirect_status');

    return (
        <Layout>
            <section id="success">
                <div className="success-message">
                    <h1>Payment Successful</h1>
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
