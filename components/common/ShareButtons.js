import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

const ShareButtons = ({ className }) => (
    <div className={ className }>
        <a
            className="btn btn-sm btn-primary mr-2"
            href="https://www.facebook.com/sharer/sharer.php?u=https://freefrom-map-frontend.herokuapp.com/"
            target="_blank"
            rel="noopener noreferrer"
        >
            <FontAwesomeIcon icon={ faFacebook } className="mr-1" /> Share
        </a>
        <a href="https://twitter.com/intent/tweet?text=Check%20out%20the%20new%20National%20Survivor%20Wealth%20Policy%20Map%20and%20Scorecard%20from%20@freefromorg!&url=https://freefrom-map-frontend.herokuapp.com/" target="_blank" rel="noopener noreferrer">
            <button type="button" className="btn btn-sm btn-primary" style={{backgroundColor: '#1b95e0', borderColor: '#1b95e0'}}>
                <FontAwesomeIcon icon={ faTwitter } className="mr-1" /> Tweet
            </button>
        </a>
    </div>
)

ShareButtons.propTypes = {
    className: PropTypes.string
}

export default ShareButtons
