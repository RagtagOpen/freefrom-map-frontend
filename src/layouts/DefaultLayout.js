import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from 'common/Sidebar';

function DefaultLayout(props) {
    return (
        <div className="container mt-2 mb-4">
            <div className="row">
                <div className="col-sm-12 col-md-3 bg-light pt-2">
                    <Sidebar active={props.active} />
                </div>
                <div className="col-md-9 pt-2">
                    { props.children }
                </div>
            </div>
        </div>
    )
}

DefaultLayout.propTypes = {
    active: PropTypes.string,
    children: PropTypes.object
}

export default DefaultLayout;