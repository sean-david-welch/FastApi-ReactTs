import Layout from '../components/Layout';
import CheckoutPage from '../components/cart/CheckoutForm';

export const Checkout = () => {
    return (
        <Layout>
            <section id="checkout">
                <CheckoutPage />
            </section>
        </Layout>
    );
};

export default Checkout;
