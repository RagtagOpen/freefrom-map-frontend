import React from 'react';

import logo from '../images/logo.jpg';

function Navbar() {
    return (
        <div className="bg-dark">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark container">
                <a className="navbar-brand" href="/">
                    <img
                        className="img-fluid h-75px"
                        alt="FreeFrom Map Admin"
                        title="FreeFrom Map Admin"
                        src={logo} />
                </a>
            </nav>
        </div>
    )
}

export default Navbar;