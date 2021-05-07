import React, { useEffect } from "react";
import ReactGA from "react-ga"
import PropTypes from "prop-types"
import { trackPageView } from 'utils';

export default function Tracking({ children }) {
    useEffect(() => { trackPageView(window.location.href) })

    return (
        <>
            {children}
        </>
    )
}

Tracking.propTypes = {
    children: PropTypes.node
}
