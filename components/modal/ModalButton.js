import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import styles from './Modal.module.css';

// FIXME: Should this be renamed, since it defines a common button element that
//  can be used for both modal buttons and link/href buttons for navigation?
export default function ModalButton({ href, target, text }) {
    if (href) {
        return (
            <a type="button" className={`btn btn-primary ${styles.button}`} href={href}>
                <FontAwesomeIcon icon={ faArrowRight } className="mr-1" /> { text }
            </a>
        )
    }
    return (
        <button type="button" className={`btn btn-primary ${styles.button}`} data-toggle="modal" data-target={ `#${target}` }>
            <FontAwesomeIcon icon={ faArrowRight } className="mr-1" /> { text }
        </button>
    )
}

ModalButton.propTypes = {
    href: PropTypes.string,
    target: PropTypes.string,
    text: PropTypes.string
}
