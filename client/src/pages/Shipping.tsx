import Layout from '../components/Layout';
import AddressForm from '../components/cart/AddressForm';

export const Shipping = () => {
    return (
        <Layout>
            <section id="checkout">
                <AddressForm />
            </section>
        </Layout>
    );
};

export default Shipping;
