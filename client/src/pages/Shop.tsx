import Layout from '../components/Layout';
import Loading from '../components/Loading';
import SectionHeading from '../components/navigation/SectionHeading';
import ProductsList from '../components/products/ProductLists';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const Shop = () => {
    const navigate = useNavigate();

    const handleCreateClick = () => {
        navigate('/product-form', { state: { action: 'create' } });
    };

    return (
        <Layout>
            <Suspense fallback={<Loading />}>
                <SectionHeading
                    onClick={handleCreateClick}
                    headingText="Brownse Primal Formula's Products:"
                    buttonLabel="Create Product"
                    buttonUrl="/product-form"
                    buttonIcon={
                        <FontAwesomeIcon icon={faArrowRight} className="icon" />
                    }
                />
                <ProductsList />
            </Suspense>
        </Layout>
    );
};

export default Shop;
