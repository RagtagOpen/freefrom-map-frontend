import React from 'react'
import { Field } from 'formik'
import PropTypes from 'prop-types'

import { checkRequired } from './helpers'
import styles from './FormStyles.module.css'

export default function Input({ className, type, label, name, smallText, required, placeholder }) {
    function small() {
        if (smallText !== '') {
            return <small className='form-text text-muted'>{smallText}</small>
        }
    }

    return (
        <div className={`form-group pb-4 ${className}`}>
            <label htmlFor={name} className={styles.label}>
                {label}
                {checkRequired(required)}
            </label>
            <Field
                type={type}
                id={name}
                name={name}
                className={`form-control ${styles.input}`}
                placeholder={placeholder}
                required={required}
            />
            {small()}
        </div>
    )
}

Input.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    smallText: PropTypes.string,
    required: PropTypes.bool,
    placeholder: PropTypes.string
}

Input.defaultProps = {
    type: 'text',
    placeholder: ''
}
