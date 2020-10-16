import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from 'common/Sidebar';

function DefaultLayout(props) {

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-3 bg-light">
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    { props.children }
                </div>
            </div>
        </div>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.array
}

export default DefaultLayout;