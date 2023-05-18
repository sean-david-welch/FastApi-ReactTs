import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { LogoHeadingProps } from '../../Types/HomeTypes';
import fetchStaticContent from '../../utils/fetchStaticContent';

const LogoHeading: React.FC<LogoHeadingProps> = ({ headingText }) => {
    const logoQuery = useQuery(['logo.png'], () => fetchStaticContent('logo'));

    if (logoQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (logoQuery.isError && logoQuery.error instanceof Error) {
        return <div>Error: {logoQuery.error.message}</div>;
    }

    const logo = logoQuery.data?.content;

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
