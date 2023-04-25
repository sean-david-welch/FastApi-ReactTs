import NavButton from './NavButton';

interface Props {
    headingText: string;
    buttonLabel: string;
    buttonUrl: string;
    buttonIcon: React.ReactNode;
}

const SectionHeading: React.FC<Props> = ({
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
