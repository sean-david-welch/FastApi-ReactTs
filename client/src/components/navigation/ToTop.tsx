import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import scrollToTop from '../../utils/scrollToTop';

const ToTopButton: React.FC = () => {
    return (
        <button className="toTopButton" onClick={scrollToTop}>
            <FontAwesomeIcon icon={faArrowUp} size="2x" />
        </button>
    );
};

export default ToTopButton;
