import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";

function Navbar() {
    return (
        <nav className="navbar fixed-top navbar-expand-lg header">
            <a className="navbar-brand logo" href="/">
                <Image
                    className="img img-fluid"
                    src="/images/freefrom-logo.png"
                    alt="FreeFrom"
                    width="134"
                    height="56"
                    layout="intrinsic" />
            </a>
            <ul className="navbar-nav ml-auto d-lg-none">
                <li className="nav-item nav-item-safety">
                    <a className="nav-link" href="https://weather.com">Exit</a>
                </li>
            </ul>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar"
                aria-controls="collapsibleNavbar" aria-expanded="false" aria-label="Toggle navigation">
                <FontAwesomeIcon icon={ faBars } color="black" />
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/about">About This Tool</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/give-feedback">Give Feedback</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="https://freefrom.org">About FreeFrom</a>
                    </li>
                    <li className="nav-item nav-item-safety d-none d-lg-block">
                        <a className="nav-link" href="https://weather.com">Safety Exit</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
