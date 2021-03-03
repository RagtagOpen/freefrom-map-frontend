import React from 'react';
import { Field } from "formik";
import PropTypes from 'prop-types';

import { checkRequired } from './helpers';
import styles from './FormStyles.module.css';

import { mockSelect } from "constants/index";

export default function Select({ className, label, name, options, smallText, required }) {
    function small() {
        if (smallText !== "") {
            return <small className="form-text text-muted">{ smallText }</small>
        }
    }

    function renderOption(option, index) {
        return <option key={`${option.value}-${index}`} value={ option.value }>{ option.label }</option>
    }

    return (
        <div className={ `form-group pb-4 ${className}` }>
            <label htmlFor={ name } className={ styles.label }>{ label }{ checkRequired(required) }</label>
            <Field component="select" className={`form-control ${ styles.select }`} name={ name } required={ required }>
                <option value="">Select One</option>
                { options.map((option, index) => renderOption(option, index)) }
            </Field>
            { small() }
        </div>
    )
}

Select.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
    smallText: PropTypes.string,
    required: PropTypes.bool,
}

Select.defaultProps = {
    options: mockSelect,
    required: false
}
