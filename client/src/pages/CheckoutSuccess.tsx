import Layout from '../components/Layout';
import SectionHeading from '../components/navigation/SectionHeading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

export const CheckoutSuccess = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get('session_id');

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
                <p>Session ID: {sessionId}</p>
            </section>
        </Layout>
    );
};

export default CheckoutSuccess;
