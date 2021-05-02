import React, { useState } from "react";
import PropTypes from "prop-types"
import Head from 'next/head';
import Navbar from "./Navbar";
import Footer from "./Footer";
import CookiesConsent from 'components/CookiesConsent'
import Tracking from 'components/Tracking'
import { getCookiesFromLocalStorage } from 'utils'
import { site } from "constants/index"

export default function SharedLayout({ title, children }) {
    const [cookie, setCookie] = useState(getCookiesFromLocalStorage());

    return (
        <>
            <Head>
                <title> {title ? (`${ title } -`) : ''} { site.name }</title>
            </Head>

            <Tracking>
                <div className='shared-layout'>
                    <Navbar />
                    <div className='container-fluid px-4 px-md-5t st pb-5'>
                        { children }
                    </div>
                    <Footer />
                    { cookie != null && cookie != undefined ? null : <CookiesConsent setCookie={setCookie} /> }
                </div>
            </Tracking>
        </>
    );
}

SharedLayout.propTypes = {
    children: PropTypes.node
}
