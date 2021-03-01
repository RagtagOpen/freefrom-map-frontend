import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faQuestion } from '@fortawesome/free-solid-svg-icons'

import Modal from '../modal/Modal'
import ScoreLabel from './ScoreLabel'

// TODO: Determine if there's a suitable free icon substitute for this?
export const EmptySquare = () => (
    <span className='empty-square-icon' style={{fontSize: '2em', paddingBottom: '2px'}}>
        &#9633;
    </span>
)

const ScoringGuide = () => (
    <Modal target="scoring-guide"
        text="Scoring guide"
        title="Scoring guide">
        <div className="container-fluid">
            <div className="row">
                <h4 className="guide-heading">Overall State Score</h4>
                <div className='overall scoring-guide'>
                    {[3, 2, 1, 0, -1].map(score => (
                        <ScoreDescription key={score} score={score}/>
                    ))}
                </div>
                <h4 className="guide-heading">Policy Category Scores</h4>
                <div className='category scoring-guide'>
                    {[3, 2, 1, 0, -1].map(score => (
                        <ScoreDescription key={score} type='category' score={score}/>
                    ))}
                </div>
                <h4 className="guide-heading">Checklist Legend</h4>
                <div className='checklist-item small'>
                    <FontAwesomeIcon icon={ faCheck } className="mr-2" />
                    This state&apos;s policy includes this characteristic
                </div>
                <div className='checklist-item small'>
                    <FontAwesomeIcon icon={ faQuestion } style={{marginRight: '13px'}} />
                    It is unclear whether this state&apos;s includes this characteristic
                </div>
                <div className='checklist-item small'>
                    <EmptySquare className="mr-2" />
                    This state&apos;s policy does not include this characteristic
                </div>
            </div>
        </div>
    </Modal>
)

const ScoreDescription = ({score, type}) => (
    <div className='score-description row pb-4'>
        <div className="col-6">
            <ScoreLabel type={type} score={score}/>
        </div>
        <div className="col-6">
            <p className='small'>
                This state is prioritizing survivors&apos; financial security...
            </p>
        </div>
    </div>
)

ScoreDescription.propTypes = {
    score: PropTypes.number,
    type: PropTypes.string
}

export default ScoringGuide
