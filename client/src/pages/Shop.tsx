import Layout from '../components/Layout';
import Loading from '../components/Loading';
import { Suspense, lazy } from 'react';
import { useAuth } from '../hooks/login/useAuthContext';

const ProductsList = lazy(
    async () => await import('../components/products/ProductLists')
);

export const Shop = () => {
    const { user: currentUser } = useAuth();
    console.log(currentUser);

    return (
        <Layout>
            <Suspense fallback={<Loading />}>
                <ProductsList />
            </Suspense>
        </Layout>
    );
};

export default Shop;
