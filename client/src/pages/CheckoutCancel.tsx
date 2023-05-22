import Layout from '../components/Layout';
import SectionHeading from '../components/navigation/SectionHeading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const CheckoutCancled = () => {
    return (
        <Layout>
            <section id="success">
                <SectionHeading
                    headingText="Payment Cancelled"
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

export default CheckoutCancled;
