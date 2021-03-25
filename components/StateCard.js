import React from 'react'

import { OVERALL_SCORE_LABELS } from '../constants'
import ScoreLabel from 'components/common/ScoreLabel'
import ModalButton from "./modal/ModalButton"
import { toSlug } from 'utils'

const StateCard = ({hideLearnMore, state}) => {
    const { grade, name } = state
    return (
        <div className="card-body p-2 mt-2">
            <h5 className="card-title" style={{textTransform: 'uppercase'}}>{name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Rank: {grade.grade}st</h6>
            <ScoreLabel score={grade.grade} />
            <p className="card-text mt-2 mb-1 font-weight-lighter font-italic small">
                {OVERALL_SCORE_LABELS[grade.grade]}
            </p>
            {hideLearnMore
                ? null
                : <ModalButton text="Learn more" href={`/states/${toSlug(name)}`}/>
            }
        </div>
    )
}

export default StateCard
