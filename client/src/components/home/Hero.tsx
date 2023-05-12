import hero1 from '../../assets/hero1.mp4';
import NavButton from '../navigation/NavButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const Hero = () => {
    return (
        <div className="hero">
            <div className="overlay" />
            <video src={hero1} autoPlay loop muted />
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
