import { useRef } from 'react';
import { InfoItemProps } ;
import useIntersectionObserver from '../../hooks/navigation/useIntersectionObserver';

const InfoItem: React.FC<InfoItemProps> = ({ image, title, description }) => {
    const infoItemRef = useRef<HTMLLIElement>(null);

    useIntersectionObserver(infoItemRef);

    return (
        <li className="info-list-item" ref={infoItemRef}>
            <img src={image} alt="Info-Item" />
            <div className="info-description">
                <h2 className="section-heading">{title}</h2>
                <p>{description}</p>
            </div>
        </li>
    );
};
export default InfoItem;
