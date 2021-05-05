import React, { useEffect } from "react";
import ReactGA from "react-ga"
import PropTypes from "prop-types"
import { getCookiesFromLocalStorage } from 'utils';

export default function Tracking({ children }) {
    useEffect(() => {
        if(getCookiesFromLocalStorage) {
            if(process.env.NEXT_PUBLIC_GA_ID != null && process.env.NEXT_PUBLIC_GA_ID != undefined) {
                console.log("***** GOOGLE ANALYTICS *****");
                console.log(process.env.NEXT_PUBLIC_GA_ID);

                ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID);
                ReactGA.pageview(window.location.href);
            }
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
