import InfoItem from './InfoItem';
import useFetchAboutInfo from '../../hooks/about/useAboutInfo';
import Loading from '../Loading';

interface AboutInfo {
    image: string;
    title: string;
    description: string;
}

const CompanyInfo = () => {
    const { data: infoItems, isLoading, isError, error } = useFetchAboutInfo();

    if (isLoading) {
        return (
            <section id="about">
                <Loading />
            </section>
        );
    }

    if (isError || error) {
        return (
            <div>
                Error:{' '}
                {error instanceof Error ? error.message : 'Unknown error'}
            </div>
        );
    }

    return (
        <div className="company-info">
            <ul className="info-list">
                {infoItems?.map((infoItem: AboutInfo, index: number) => (
                    <InfoItem
                        key={index}
                        image={infoItem.image}
                        title={infoItem.title}
                        description={infoItem.description}
                    />
                ))}
            </ul>
        </div>
    );
};

export default CompanyInfo;
