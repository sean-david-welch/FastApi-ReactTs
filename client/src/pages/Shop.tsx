import Layout from '../components/Layout';
import Loading from '../components/Loading';
import ProductsList from '../components/products/ProductLists';
import SectionHeading from '../components/navigation/SectionHeading';

import { useAuth } from '../hooks/login/useAuthContext';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Shop = () => {
    const navigate = useNavigate();
    const { isLoggedIn, isSuperUser } = useAuth();

    const handleCreateClick = () => {
        navigate('/product-form', { state: { action: 'create' } });
    };

    return (
        <Layout>
            <Suspense fallback={<Loading />}>
                {isLoggedIn && isSuperUser ? (
                    <SectionHeading
                        onClick={handleCreateClick}
                        headingText="Browse Primal Formula's Products:"
                        buttonLabel="Create Product"
                        buttonUrl="/product-form"
                        buttonIcon={
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                className="icon"
                            />
                        }
                    />
                ) : (
                    <h2 className="section-heading">
                        Browse Primal Formula's Products:
                    </h2>
                )}

                <ProductsList />
            </Suspense>
        </Layout>
    );
};

export default Shop;
