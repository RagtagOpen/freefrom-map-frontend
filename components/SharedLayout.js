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
                <meta property="og:title" content="The National Survivor Financial Security Policy Map and Scorecard"/>
                <meta name="description" content="How well does your state support survivors’ financial security?"/>
                <meta property="og:description" content="How well does your state support survivors’ financial security?"/>
                <meta property="og:url" content="https://mapandscorecard.freefrom.org"/>
                <meta property="og:image" content="https://mapandscorecard.freefrom.org/images/opengraph.png"/>
                <meta property="og:type" content="website" />
            </Head>

            <Tracking>
                <div className='shared-layout' lang='en'>
                    <Navbar />
                    <div className='container-fluid px-4 px-lg-5 px-md-5t st pb-5'>
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
