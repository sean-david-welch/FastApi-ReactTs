import NavButton from './NavButton';
import { SectionHeadingProps } from '../../types/Types';

const SectionHeading: React.FC<SectionHeadingProps> = ({
    headingText,
    buttonLabel,
    buttonUrl,
    buttonIcon,
}) => {
    return (
        <>
            <h2 className="section-heading">{headingText}</h2>
            <ul>
                <NavButton to={buttonUrl} icon={buttonIcon}>
                    {buttonLabel}
                </NavButton>
            </ul>
        </>
    );
};

export default SectionHeading;
