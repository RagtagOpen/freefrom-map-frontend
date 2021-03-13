import React from "react";
import PropTypes from "prop-types"
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SharedLayout({ children }) {
    return (
        <div className='shared-layout'>
            <Navbar />
            <div className='container-fluid px-5 px-sm-3 pb-5'>
                { children }
            </div>
            <Footer />
        </div>
    );
}

SharedLayout.propTypes = {
    children: PropTypes.array
}
