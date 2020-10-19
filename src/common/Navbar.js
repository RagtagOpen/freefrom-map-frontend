import React from 'react';

import logo from '../images/logo.jpg';

function Navbar() {
    return (
        <div className="bg-dark">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark container">
                <a className="navbar-brand" href="/" title="Go to admin homepage">
                    <img
                        alt="FreeFrom Map Admin"
                        className="img-fluid h-75px"
                        src={logo} />
                </a>
            </nav>
        </div>
    )
}

export default Navbar;