import React from 'react';
import PropTypes from 'prop-types';

import { checkRequired } from './helpers';
import styles from './FormStyles.module.css';

export default function FormLabel({ required, children }) {
    return (
        <label className={ styles.label }>{ children }{ checkRequired(required) }</label>
    )
}

FormLabel.propTypes = {
    required: PropTypes.bool
}

FormLabel.defaultProps = {
    required: false
}