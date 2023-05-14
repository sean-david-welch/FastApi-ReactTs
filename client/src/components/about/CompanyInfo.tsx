import InfoItem from './InfoItem';

const CompanyInfo = () => {
    const infoItems = [
        {
            image: 'https://via.placeholder.com/150',
            title: 'Company Info 1',
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, sapiente!',
        },
        {
            image: 'https://via.placeholder.com/150',
            title: 'Company Info 2',
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        },
    ];

    return (
        <div className="company-info">
            <h2>Lorem ipsum dolor sit amet.</h2>
            <ul className="info-list">
                {infoItems.map((infoItem, index) => (
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
