import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import styles from '../common/Common.module.css'

import { useRouter } from 'next/router'

export default function BackButton({ text, className }) {
    const router = useRouter()

    return (
        <div className={className}>
            <button className={'btn back-button'} onClick={() => router.push('/')}>
                {' '}
                <FontAwesomeIcon icon={faArrowLeft} className={`mr-1 ${styles['take-action-link']}`} /> {text}
            </button>
        </div>
    )
}

BackButton.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string
}

BackButton.defaultProps = {
    text: 'Back to Policy Map'
}
