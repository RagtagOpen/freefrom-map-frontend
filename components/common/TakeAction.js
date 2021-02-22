import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router'

import styles from './Common.module.css';

const links = [
    {path: "/contact-legislators", label: "Contact Your Legislators"},
    {path: "/survivor-power", label: "Build Collective Survivor Power"},
    {path: "/partner-with-freefrom", label: "Partner with Freefrom"},
    {path: "/policy-ideas", label: "Share Your Policy Ideas"}
]

const arrow = <FontAwesomeIcon icon={ faArrowRight } className="mr-1" />

export default function TakeAction() {
    const { pathname } = useRouter()
    return (
        <div className={ `take-action mt-2 mb-5` }>
            <h1>Take action</h1>
            <div className="d-flex flex-column justify-content-start">
                {links.map(({path, label}) => {
                    // Do not render the link if it links to the current page.
                    // In other words, if we're on the Policy Ideas page, we
                    // don't want to show that link.
                    if (path === pathname) return null
                    return (
                        <div className="ml-4 my-4" key={path}>
                            <a href={path} className={`${styles["take-action-link"]}`}>
                                {arrow}{' '}{label}
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
