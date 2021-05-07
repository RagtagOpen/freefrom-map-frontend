import React, { useState } from "react";
import PropTypes from "prop-types"
import Navbar from "./Navbar";
import Footer from "./Footer";
import CookiesConsent from 'components/CookiesConsent'
import { getCookiesFromLocalStorage } from 'utils'

export default function SharedLayout({ children }) {
    const [cookie, setCookie] = useState(getCookiesFromLocalStorage());

    return (
        <div className='shared-layout'>
            <Navbar />
            <div className='container-fluid px-4 px-md-5t st pb-5'>
                { children }
            </div>
            <Footer />
            { cookie != null && cookie != undefined ? null : <CookiesConsent setCookie={setCookie} /> }
        </div>
    );
}

SharedLayout.propTypes = {
    children: PropTypes.node
}
