import { Link } from 'react-router-dom';
import { LogoHeadingProps } from '../../Types/HomeTypes';
import useFetchStaticContent from '../../utils/fetchStaticContent';

const LogoHeading: React.FC<LogoHeadingProps> = ({ headingText }) => {
    const logoQuery = useFetchStaticContent('logo', 'png');

    if (logoQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (logoQuery.isError && logoQuery.error instanceof Error) {
        return <div>Error: {logoQuery.error.message}</div>;
    }

    const logo = logoQuery.data?.content;

    return (
        <>
            <div className="logo-heading">
                <Link to="/" className="logo-link">
                    <img
                        src={logo}
                        id="logo"
                        alt="Logo"
                        className="logo-heading"
                    />
                </Link>
                <h2 className="section-heading">{headingText}</h2>
            </div>
        </>
    );
};

export default LogoHeading;
