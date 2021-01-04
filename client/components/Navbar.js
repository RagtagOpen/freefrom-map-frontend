import React from 'react';
import Image from 'next/image';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg justify-content-between header">
            <a className="navbar-brand logo" href="#">
                <Image
                    className="img img-fluid"
                    src="/images/freefrom-logo.png"
                    alt="FreeFrom"
                    width="134"
                    height="56"
                    layout="intrinsic" />
            </a>
            <div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="https://freefrom.org">Back to FreeFrom Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Give Feedback</a>
                        </li>
                        <li className="nav-item nav-item-safety">
                            <a className="nav-link" href="https://weather.com">Safety Exit</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
