import React from 'react'
import { Field } from 'formik'
import PropTypes from 'prop-types'

import styles from './FormStyles.module.css'

export default function Checkbox({ className, name, children, value }) {
    return (
        <div className={`custom-control custom-checkbox ${className}`}>
            <Field type='checkbox' className='custom-control-input' id={value} name={name} value={value} />
            <label className={`custom-control-label ${styles.label}`} htmlFor={value}>
                {children}
            </label>
        </div>
    )
}

Checkbox.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    name: PropTypes.string,
    value: PropTypes.string
}
