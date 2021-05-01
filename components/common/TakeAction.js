import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router'

import styles from './Common.module.css';

const links = [
    {path: "/contact-legislators", label: "Contact Your Legislators", bgd: "#FFB600"},
    {path: "/survivor-power", label: "Build Collective Survivor Power", bgd: "#47CCCC"},
    {path: "/partner-with-freefrom", label: "Partner with FreeFrom", bgd: "#FF9797"},
    {path: "/policy-ideas", label: "Share Your Policy Ideas", bgd: "#F06449"}
]

export default function TakeAction() {
    const { pathname } = useRouter()
    return (
        <div className="take-action-parent">
            <h2 className="mt-5">Take action</h2>
            <div className="take-action-container d-flex flex-wrap" style={{maxWidth: '750px'}}>
                {links.map(({path, label, bgd}) => {
                    // Do not render the link if it links to the current page.
                    // In other words, if we're on the Policy Ideas page, we
                    // don't want to show that link.
                    if (path === pathname) return null
                    return (
                        <div className={`${styles["take-action-box"]} mb-4 mr-4`} key={path} style={{backgroundColor: bgd}}>
                            <a className={`${styles["take-action-link"]}`} href={path}>
                                <img src={"../../images/take-action" + path + ".jpg"} className={`${styles["take-action-image"]}`} alt={label}/>
                                <div className={`${styles["take-action-text-area"]}`}>
                                    <h2 className={`${styles["take-action-text"]} p-3 m-0`}>{label}</h2>
                                </div>
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
