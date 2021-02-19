import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

const ShareButtons = ({ className }) => (
    <div className={ className }>
        <button type="button" className="btn btn-sm btn-primary mr-2">
            <FontAwesomeIcon icon={ faFacebook } className="mr-1" /> Share
        </button>
        <button type="button" className="btn btn-sm btn-primary">
            <FontAwesomeIcon icon={ faTwitter } className="mr-1" /> Tweet
        </button>
    </div>
)

ShareButtons.propTypes = {
    className: PropTypes.string
}

export default ShareButtons
