import {
    faShieldVirus,
    faAtom,
    faFire,
    faHammer,
} from '@fortawesome/free-solid-svg-icons';
import BenefitItem from './ItemBenefit';

function BenefitsHome() {
    const benefits = [
        {
            icon: faShieldVirus,
            title: 'Increased Immune Function',
            description:
                "Boost your immune system and defend against illnesses with our desiccated organ supplements. Strengthen your body's natural defense mechanism.",
        },
        {
            icon: faFire,
            title: 'Increased Energy Levels',
            description:
                'Experience a natural energy boost throughout the day. Our desiccated organ supplements provide essential nutrients to fuel your body and enhance vitality.',
        },
        {
            icon: faAtom,
            title: 'Helps Autoimmune Issues',
            description:
                'Find relief and support for autoimmune conditions. Our desiccated organ supplements aid in managing symptoms and promoting overall well-being.',
        },
        {
            icon: faHammer,
            title: 'Faster Recovery',
            description:
                "Enhance your body's recovery process after physical exertion. Our desiccated organ supplements assist in faster healing and rejuvenation.",
        },
    ];

    return (
        <div className="benefits-home">
            <div className="benefits-home-title">
                <h2>Benefits of Consistent Supplementation:</h2>
            </div>
            <ul className="benefits-list">
                {benefits.map((benefit, index) => (
                    <BenefitItem
                        key={index}
                        icon={benefit.icon}
                        title={benefit.title}
                        description={benefit.description}
                    />
                ))}
            </ul>
        </div>
    );
}

export default BenefitsHome;
