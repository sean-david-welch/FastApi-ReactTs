import Layout from '../components/Layout';
import CheckoutForm from '../components/cart/CheckoutForm';

export const Checkout = () => {
    return (
        <Layout>
            <section id="checkout">
                <CheckoutForm />
            </section>
        </Layout>
    );
};

export default Checkout;
