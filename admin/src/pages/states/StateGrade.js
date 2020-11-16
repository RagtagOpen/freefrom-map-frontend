import React from 'react';
import PropTypes from 'prop-types';

function StateGrade(props) {

    const gradeClass = [
        'btn-success',
        'btn-success',
        'btn-warning',
        'btn-danger',
        'btn-danger'
    ]

    const gradeTitle = [
        'A', 'B', 'C', 'D', 'F'
    ]

    return (
        <div className={`btn ${ gradeClass[props.grade] }`}>
            { gradeTitle[props.grade] }
        </div>
    )
}

StateGrade.propTypes = {
    grade: PropTypes.number,
}

export default StateGrade;