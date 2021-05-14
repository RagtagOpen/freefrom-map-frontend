import React from 'react'
import PropTypes from 'prop-types'
import ordinal from 'ordinal'

import { OVERALL_SCORE_LABELS } from '../constants'
import ScoreLabel from 'components/common/ScoreLabel'
import ModalButton from './modal/ModalButton'
import { toSlug } from 'utils'

const StateCard = ({ hideLearnMore, state, onLearnMoreClick }) => {
    const { grade, name, rank } = state

    return (
        <div className='card-body p-2 mt-2'>
            <h5 className='card-title mb-2 pb-1' style={{ textTransform: 'uppercase' }}>
                {name}
            </h5>
            <h6 className='card-subtitle mb-2 pb-1 text-muted'>Rank: {ordinal(rank)}</h6>
            <ScoreLabel score={grade.grade} />
            <p className='card-text mt-2 pt-1 mb-2'>{OVERALL_SCORE_LABELS[grade.grade]}</p>
            {hideLearnMore ? null : (
                <ModalButton text='Learn more' href={`/states/${toSlug(name)}`} onClick={onLearnMoreClick} />
            )}
        </div>
    )
}

StateCard.propTypes = {
    hideLearnMore: PropTypes.bool,
    onLearnMoreClick: PropTypes.func,
    state: PropTypes.shape({
        grade: PropTypes.shape({
            grade: PropTypes.number
        }),
        name: PropTypes.string,
        rank: PropTypes.number
    })
}

export default StateCard
