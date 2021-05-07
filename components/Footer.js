import React from "react";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

function Footer() {
    return (
        <div className="footer d-flex justify-content-lg-around justify-content-center align-items-center flex-column flex-md-row p-2 py-md-5">
            <div className="py-2 my-md-0 mt-4">
                <h2 className="mt-0">Follow FreeFrom</h2>
                <div>
                    <a href="https://www.facebook.com/freefrom.org" target="_blank" rel="noopener noreferrer">
                        <span className="fa-layers fa-fw fa-3x ml-1">
                            <FontAwesomeIcon icon={ faCircle } color="white" />
                            <FontAwesomeIcon icon={ faFacebookF } color="#47cccc" transform="shrink-6" />
                        </span>
                    </a>
                    <a href="https://twitter.com/freefromorg" target="_blank" rel="noopener noreferrer">
                        <span className="fa-layers fa-fw fa-3x ml-1">
                            <FontAwesomeIcon icon={ faCircle } color="white" />
                            <FontAwesomeIcon icon={ faTwitter } color="#47cccc" transform="shrink-6" />
                        </span>
                    </a>
                    <a href="https://www.instagram.com/freefromdotorg" target="_blank" rel="noopener noreferrer">
                        <span className="fa-layers fa-fw fa-3x ml-1">
                            <FontAwesomeIcon icon={ faCircle } color="white" />
                            <FontAwesomeIcon icon={ faInstagram } color="#47cccc" transform="shrink-6" />
                        </span>
                    </a>
                </div>
            </div>
            <div className="mt-4 my-md-0">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link" href="/about">About This Tool</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/methodology">Full Methodology</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="https://freefrom.org" target="_blank" rel="noopener noreferrer">About FreeFrom</a>
                    </li>
                </ul>
            </div>
            <div className="mb-4 my-md-0">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link" href="/acknowledgments">Acknowledgments</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/disclaimer">Disclaimer</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/privacy-policy">Privacy Policy</a>
                    </li>
                </ul>
            </div>
            <div className="my-2 my-md-0">
                <Image
                    className="img img-fluid"
                    src="/images/empowered-by-ragtag.png"
                    alt="Empowered By Ragtag"
                    width="151"
                    height="55" />
            </div>
        </div>
    );
}

export default Footer;
