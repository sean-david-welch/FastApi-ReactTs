import NavButton from './NavButton';
import { SectionHeadingProps } from '../../Types/HomeTypes';

const SectionHeading: React.FC<SectionHeadingProps> = ({
    headingText,
    buttonLabel,
    buttonUrl,
    buttonIcon,
    onClick,
}) => {
    return (
        <>
            <h2 className="section-heading">{headingText}</h2>
            <ul className="nav-list">
                <NavButton
                    onClick={onClick}
                    to={buttonUrl}
                    icon={buttonIcon}
                    label={buttonLabel}
                />
            </ul>
        </>
    );
};

export default SectionHeading;
