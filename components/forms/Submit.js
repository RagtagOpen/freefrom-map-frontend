import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import styles from './FormStyles.module.css';

export default function Submit({ className }) {
    return (
        <button type="submit" className={`btn mb-4 ${ className } ${ styles.submit }`}>
            <FontAwesomeIcon icon={ faArrowRight } className="mr-1" /> Submit
        </button>
    )
}

Submit.propTypes = {
    className: PropTypes.string
}