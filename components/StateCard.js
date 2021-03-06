import React from 'react'

import ScoreLabel from 'components/common/ScoreLabel'
import ModalButton from "./modal/ModalButton"
import { toSlug } from 'utils'

const StateCard = ({state}) => {
    const { grade, name } = state
    return (
        <div className="card-body p-2 mt-2">
            <h5 className="card-title" style={{textTransform: 'uppercase'}}>{name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Rank: {grade.grade}st</h6>
            <ScoreLabel score={grade.grade} />
            <p className="card-text mb-1 font-weight-lighter font-italic" style={{fontSize: '0.7em'}}>
                This state does not prioritize...
            </p>
            <ModalButton text="Learn more" href={`/states/${toSlug(name)}`}/>
        </div>
    )
}

export default StateCard
