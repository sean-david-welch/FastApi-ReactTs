import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface BenefitItemProps {
    icon: IconDefinition;
    title: string;
    description: string;
}

export interface SectionHeadingProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    headingText: string;
    buttonLabel: string;
    buttonUrl: string;
    buttonIcon: React.ReactNode;
}

export interface LogoHeadingProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    headingText: string;
}

export interface CartViewProps {
    renderSectionHeading?: React.ReactNode;
}

export interface InfoItemProps {
    image: string;
    title: string;
    description: string;
}
