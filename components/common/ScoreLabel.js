import React from 'react'
import PropTypes from 'prop-types'

const labels = {
    'overall': {
        0: 'little accountability',
        1: 'some accountability',
        2: 'taking steps',
        3: 'survivor wealth friendly',
        4: 'model state'
    },
    'category': {
        0: 'none',
        1: 'adverse',
        2: 'promisinig',
        3: 'strong',
        4: 'model'
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
