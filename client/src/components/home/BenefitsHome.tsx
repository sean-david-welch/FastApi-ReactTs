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
                'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta veniam molestias quia laborum! Soluta ad non dolore sit officiis nostrum!',
        },
        {
            icon: faFire,
            title: 'Increased Energy Levels',
            description:
                'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta veniam molestias quia laborum! Soluta ad non dolore sit officiis nostrum!',
        },
        {
            icon: faAtom,
            title: 'Helps Autoimmune Conditions',
            description:
                'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta veniam molestias quia laborum! Soluta ad non dolore sit officiis nostrum!',
        },
        {
            icon: faHammer,
            title: 'Faster Recovery',
            description:
                'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta veniam molestias quia laborum! Soluta ad non dolore sit officiis nostrum!',
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
