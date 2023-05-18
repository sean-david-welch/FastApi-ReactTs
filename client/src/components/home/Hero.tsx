import NavButton from '../navigation/NavButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import fetchStaticContent from '../../utils/fetchStaticContent';
import Loading from '../Loading';

export const Hero = () => {
    const heroQuery = useQuery(['hero1.mp4'], () => fetchStaticContent('hero'));

    if (heroQuery.isLoading) {
        return (
            <div className="hero">
                <Loading />
            </div>
        );
    }

    if (heroQuery.isError && heroQuery.error instanceof Error) {
        return <div>Error: {heroQuery.error.message}</div>;
    }

    const hero = heroQuery.data?.content;
    return (
        <div className="hero">
            <div className="overlay" />
            <video src={hero} autoPlay loop muted />
            <div className="hero-content">
                <h1 className="hero-head">
                    The foundation for Health & Performance
                </h1>
                <p className="hero-para">
                    Reach your wellness potential with our comprehnsive formulas
                </p>
                <ul className="nav-button">
                    <NavButton
                        to="/shop"
                        icon={<FontAwesomeIcon icon={faArrowRight} />}
                        label="Shop Primal Formulas"
                    />
                </ul>
            </div>
        </div>
    );
};

export default Hero;
