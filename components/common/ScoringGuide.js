import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../modal/Modal'
import ScoreLabel from './ScoreLabel'
import {
    CATEGORY_SCORE_LABELS,
    OVERALL_SCORE_LABELS,
} from '../../constants/labels';

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
                <div className='checklist-item small mb-2'>
                    <img src="/images/criteria-met.png" className="checklistIcon" alt="Criteria Met"/>
                    This state’s policy includes this characteristic
                </div>
                <div className='checklist-item small mb-2'>
                    <img src="/images/criteria-not-met.png" className="checklistIcon" alt="Criteria Not Met"/>
                    This state’s policy does not include this characteristic
                </div>
                <div className='checklist-item small mb-2'>
                    <img src="/images/criteria-maybe-met.png" className="checklistIcon" alt="Criteria Maybe Met"/>
                    It is unclear whether this state’s policy includes this characteristic
                </div>
                <div className='checklist-item small mb-2'>
                    <img src="/images/honorable-mention.png" className="checklistIcon" alt="Honorable Mention"/>
                    Honorable Mention: A promising policy that doesn’t quite fit
                </div>
                <div className='checklist-item small mb-2'>
                    <img src="/images/innovative-idea.png" className="checklistIcon" alt="Innovative Idea"/>
                    Innovative Idea: This state is thinking outside the box on policy solutions
                </div>
            </div>
        </div>
    </Modal>
)

const ScoreDescription = ({score, type}) => (
    <div className='score-description mb-4'>
        <div className="mb-2">
            <ScoreLabel type={type} score={score}/>
        </div>
        <p className='small'>
            {type === "category"
                ? CATEGORY_SCORE_LABELS[score]
                : OVERALL_SCORE_LABELS[score]}
        </p>
    </div>
)

ScoreDescription.propTypes = {
    score: PropTypes.number,
    type: PropTypes.string
}

export default ScoringGuide
