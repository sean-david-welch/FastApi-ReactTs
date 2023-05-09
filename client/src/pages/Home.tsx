import Layout from '../components/Layout';
import Hero from '../components/home/Hero';
import BenefitsHome from '../components/home/BenefitsHome';
import ProductsList from '../components/products/ProductLists';

export const Home = () => {
    return (
        <Layout>
            <section id="home">
                <Hero />
                <BenefitsHome />
                <ProductsList />
            </section>
        </Layout>
    );
};

export default Home;
