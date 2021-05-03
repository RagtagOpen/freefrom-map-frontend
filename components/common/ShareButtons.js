import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { trackEvent } from 'utils';

const ShareButtons = ({ className, context }) => (
    <div className={ className }>
        <a
            className="btn btn-sm btn-primary mr-2"
            href="https://www.facebook.com/sharer/sharer.php?u=http://mapandscorecard.freefrom.org"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent({ category: 'Click', action: 'Share on Facebook', label: context})}
        >
            <FontAwesomeIcon icon={ faFacebook } className="mr-1" /> Share
        </a>
        <a
            className="btn btn-sm btn-primary"
            href="https://twitter.com/intent/tweet?text=The%20no.%201%20obstacle%20to%20safety%20for%20survivors%20is%20financial%20insecurity.%20Check%20out%20FreeFrom’s%20National%20Survivor%20Financial%20Security%20Policy%20Map%20and%20Scorecard%20to%20see%20how%20your%20state%20measures%20up%20in%20supporting%20survivor%20financial%20security%20they%20need%20to%20stay%20safe:&url=http://mapandscorecard.freefrom.org"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent({ category: 'Click', action: 'Share on Twitter', label: context})}
        >
            <FontAwesomeIcon icon={ faTwitter } className="mr-1" /> Tweet
        </a>
    </div>
)

ShareButtons.propTypes = {
    className: PropTypes.string,
    context: PropTypes.string,
}

export default ShareButtons
