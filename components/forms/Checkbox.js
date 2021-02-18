import React from 'react';
import PropTypes from 'prop-types';

import styles from './FormStyles.module.css';

export default function Checkbox({ className, name, children }) {
    return (
        <div className={`custom-control custom-checkbox ${className}`}>
            <input type="checkbox" className="custom-control-input" id={ name } />
            <label className={`custom-control-label ${ styles.label }`} htmlFor={ name }>{ children }</label>
        </div>
    )
}

Checkbox.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
}