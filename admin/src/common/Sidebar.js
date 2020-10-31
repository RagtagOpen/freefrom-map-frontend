import React from 'react';
import PropTypes from "prop-types";

function Sidebar(props) {
    function navClasses(active) {
        let navClass = 'nav-link text-lg-center';

        if (active === props.active) {
            navClass += ' active'
        }

        return navClass;
    }

    return (
        <div className="h-100">
            <ul className="nav nav-pills">
                <li className="nav-item w-100">
                    <a className={navClasses('home')} href="/" title="Home">Home</a>
                </li>
                <li className="nav-item w-100">
                    <a className={navClasses('categories')} href="/categories" title="Scorecard">Scorecard</a>
                </li>
                <li className="nav-item w-100">
                    <a className={navClasses('states')} href="/states" title="State Scores">State Scores</a>
                </li>
                <li className="nav-item w-100">
                    <a className={navClasses('#')} href="#" title="Copy">Copy</a>
                </li>
            </ul>
        </div>
    )
}

Sidebar.propTypes = {
    active: PropTypes.string
}

export default Sidebar;