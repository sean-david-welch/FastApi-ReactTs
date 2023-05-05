import Layout from '../components/Layout';
import { Suspense, lazy } from 'react';
import Loading from '../components/Loading';

export const Shop = () => {
    const ProductsList = lazy(
        async () => await import('../components/products/ProductLists')
    );

    return (
        <Layout>
            <Suspense fallback={<Loading />}>
                <ProductsList />
            </Suspense>
        </Layout>
    );
};

export default Shop;
