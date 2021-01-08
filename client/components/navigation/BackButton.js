import React from 'react';
import PropTypes from 'prop-types';

import { useRouter } from 'next/router';

export default function BackButton({ text, className }) {
    const router = useRouter();

    return (
        <div className={ className }>
            <span className={`back-button`} onClick={() => router.back()}>{ text }</span>
        </div>
    )
}

BackButton.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string
}

BackButton.defaultProps = {
    text: "Back to Policy Map"
}