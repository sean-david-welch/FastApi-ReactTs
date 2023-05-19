import Layout from '../components/Layout';
import CompanyInfo from '../components/about/CompanyInfo';
import SectionHeading from '../components/navigation/SectionHeading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const About = () => {
    return (
        <Layout>
            <section id="about">
                <SectionHeading
                    headingText="Our Story & Why We Exist:"
                    buttonLabel="View our Products"
                    buttonUrl="/shop"
                    buttonIcon={
                        <FontAwesomeIcon icon={faArrowRight} className="icon" />
                    }
                />
                <CompanyInfo />
            </section>
        </Layout>
    );
};

export default About;
