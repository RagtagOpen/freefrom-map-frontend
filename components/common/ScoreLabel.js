import React from 'react'
import PropTypes from 'prop-types'

const labels = {
    'overall': {
        "-1": 'little accountability',
        0: 'some accountability',
        1: 'taking steps',
        2: 'survivor wealth friendly',
        3: 'model state'
    },
    'category': {
        0: 'none',
        "-1": 'adverse',
        1: 'promisinig',
        2: 'strong',
        3: 'model'
    }
}

const ScoreLabel = ({score = 0, type = 'overall'}) => (
    <div className={`score-label ${type}-${score}`}>
        {labels[type][score]}
    </div>
)

ScoreLabel.propTypes = {
    score: PropTypes.number,
    type: PropTypes.string
}

export default ScoreLabel
