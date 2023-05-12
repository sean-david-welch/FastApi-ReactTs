import Layout from '../components/Layout';
import ProductForm from '../components/products/createProductForm';

export const ProductFormPage = () => {
    return (
        <Layout>
            <section id="Product-Form">
                <h1>Product Form</h1>
                <ProductForm />
            </section>
        </Layout>
    );
};

export default ProductFormPage;
