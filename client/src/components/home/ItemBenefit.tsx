import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useIntersectionObserver from '../../hooks/navigation/useIntersectionObserver';
import { BenefitItemProps } from '../../types/Types';

const BenefitItem: React.FC<BenefitItemProps> = ({
    icon,
    title,
    description,
}) => {
    const benefitItemRef = useRef<HTMLLIElement>(null);

    useIntersectionObserver(benefitItemRef);

    return (
        <li className="benefits-list-item hidden" ref={benefitItemRef}>
            <FontAwesomeIcon icon={icon} />
            <h2>{title}</h2>
            <p>{description}</p>
        </li>
    );
};

export default BenefitItem;
