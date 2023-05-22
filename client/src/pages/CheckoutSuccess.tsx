import Layout from '../components/Layout';
import SectionHeading from '../components/navigation/SectionHeading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const CheckoutSuccess = () => {
    return (
        <Layout>
            <section id="success">
                <SectionHeading
                    headingText="Payment Successful"
                    buttonLabel="Continue Shopping"
                    buttonUrl="/Shop"
                    buttonIcon={
                        <FontAwesomeIcon icon={faArrowRight} className="icon" />
                    }
                />
            </section>
        </Layout>
    );
};

export default CheckoutSuccess;
