import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import styles from './Modal.module.css';

export default function ModalButton({ target, text }) {
    return (
        <button type="button" className={`btn btn-primary ${styles.button}`} data-toggle="modal" data-target={ `#${target}` }>
            <FontAwesomeIcon icon={ faArrowRight } className="mr-1" /> { text }
        </button>
    )
}

ModalButton.propTypes = {
    target: PropTypes.string,
    text: PropTypes.string
}