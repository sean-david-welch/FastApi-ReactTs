import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { LogoHeadingProps } from '../../Types/HomeTypes';

const LogoHeading: React.FC<LogoHeadingProps> = ({ headingText }) => {
    return (
        <>
            <Link to="/">
                <img src={logo} id="logo" alt="Logo" className="logo-heading" />
            </Link>
            <h2 className="section-heading">{headingText}</h2>
        </>
    );
};

export default LogoHeading;
