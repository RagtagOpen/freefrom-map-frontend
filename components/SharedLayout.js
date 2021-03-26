import React from "react";
import PropTypes from "prop-types"
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SharedLayout({ children }) {
    return (
        <div className='shared-layout'>
            <Navbar />
            <div className='container-fluid px-3 px-md-5t st pb-5'>
                { children }
            </div>
            <Footer />
        </div>
    );
}

SharedLayout.propTypes = {
    children: PropTypes.node
}
