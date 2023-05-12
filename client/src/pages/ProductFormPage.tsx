import Layout from '../components/Layout';
import CreateProductForm from '../components/products/CreateProductForm';
import UpdateProductForm from '../components/products/UpdateProductForm';
import { useLocation } from 'react-router-dom';

export const ProductFormPage = () => {
    const { state } = useLocation();
    return (
        <Layout>
            <section id="product-form">
                {state?.action === 'update' && state.product ? (
                    <UpdateProductForm initialProduct={state.product} />
                ) : (
                    <CreateProductForm />
                )}
            </section>
        </Layout>
    );
};

export default ProductFormPage;
