import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import styles from './Common.module.css';

export default function TakeAction() {
    return (
        <div className={ `take-action mt-2 mb-5` }>
            <h1>Take action</h1>
            <div className="d-flex flex-column justify-content-start">
                <div className="ml-4 my-4">
                    <a href="/contact-your-legislators" className={`${styles["take-action-link"]}`}>
                        <FontAwesomeIcon icon={ faArrowRight } className="mr-1" /> Contact Your Legislators
                    </a>
                </div>
                <div className="ml-4 my-4">
                    <a href="/survivor-power" className={` ${styles["take-action-link"]}`}>
                        <FontAwesomeIcon icon={ faArrowRight } className="mr-1" /> Build Collective Survivor Power
                    </a>
                </div>
                <div className="ml-4 my-4">
                    <a href="/policy-ideas" className={` ${styles["take-action-link"]}`}>
                        <FontAwesomeIcon icon={ faArrowRight } className="mr-1" /> Share Your Policy Ideas
                    </a>
                </div>
            </div>
        </div>
    )
}