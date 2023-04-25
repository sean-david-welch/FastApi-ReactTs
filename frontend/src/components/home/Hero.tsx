import hero1 from '../../assets/hero1.mp4';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const Hero = () => {
    return (
        <div className="hero">
            <div className="overlay" />
            <video src={hero1} autoPlay loop muted />
            <h1 className="hero-head">
                The foundation for Health & Performance
            </h1>
            <p className="hero-para">
                Reach your wellness potential with our comprehnsive formulas
            </p>
            <button className="btn btn-primary btn-nav btn-hero">
                <Link to="/shop">
                    {'Shop Primal Formulas'}
                    <FontAwesomeIcon icon={faArrowRight} className="icon" />
                </Link>
            </button>
        </div>
    );
};

export default Hero;
