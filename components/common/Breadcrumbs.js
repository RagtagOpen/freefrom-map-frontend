import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from '../common/Common.module.css';

import { useRouter } from 'next/router';

export default function Breadcrumbs({ className, text, currentPageTitle }) {
    const router = useRouter();

    return (
        <div className={ `breadcrumbs mt-2 mb-3 ${className}` }>
            <span onClick={() => router.push('/')}> <FontAwesomeIcon icon={ faArrowLeft } className={`mr-1 ${styles["take-action-link"]}`} /> { text }</span>
            <span className="mx-2">/</span>
            <span>{ currentPageTitle }</span>
        </div>
    )
}

Breadcrumbs.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    currentPageTitle: PropTypes.string
}

Breadcrumbs.defaultProps = {
    text: "Back to Policy Map"
}
