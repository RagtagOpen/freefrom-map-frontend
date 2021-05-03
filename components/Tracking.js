import React, { useEffect } from "react";
import ReactGA from "react-ga"
import PropTypes from "prop-types"
import { getCookiesFromLocalStorage } from 'utils';

export default function Tracking({ children }) {
    useEffect(() => {
        if(getCookiesFromLocalStorage && process.env.NEXT_PUBLIC_GA_ID) {
            ReactGA.pageview(window.location.href);
        }
    });

    return (
        <>
            {children}
        </>
    )
}

Tracking.propTypes = {
    children: PropTypes.node
}
