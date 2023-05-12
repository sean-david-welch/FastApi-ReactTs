import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Hero from '../components/home/Hero';
import Layout from '../components/Layout';
import BenefitsHome from '../components/home/BenefitsHome';
import ProductsList from '../components/products/ProductLists';
import SectionHeading from '../components/navigation/SectionHeading';

export const Home = () => {
    return (
        <Layout>
            <section id="home">
                <Hero />
                <BenefitsHome />
                <SectionHeading
                    headingText="Browse Our Products:"
                    buttonLabel="View All Products"
                    buttonUrl="/Shop"
                    buttonIcon={
                        <FontAwesomeIcon icon={faArrowRight} className="icon" />
                    }
                />
                <ProductsList />
            </section>
        </Layout>
    );
};

export default Home;
