import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import ScoreLabel from './common/ScoreLabel'

const Scorecard = ({categories, overallScore}) => (
    <div className='scorecard-container'>
        <div className='overall mt-5 mb-3'>
            <span className='label mr-2'>Overall:</span>
            <ScoreLabel score={overallScore}/>
        </div>
        <p><em>This state prioritizes...</em></p>
        <div className="scorecard accordion" id="scorecard">
            {categories.map(category => (
                <Category category={category} key={category.id} />
            ))}
        </div>
    </div>
)

Scorecard.propTypes = {
    categories: PropTypes.array,
    overallScore: PropTypes.number
}

const Category = ({ category }) => {
    const collapseId = `collapse-${category.id}`
    const headingId = `heading-${category.id}`
    return (
        <div className="category accordion-i" style={{borderTop: '1px solid black'}}>
            <div id={headingId}
                className="pt-3 pb-3"
                type="button"
                data-toggle="collapse"
                data-target={`#${collapseId}`}
                aria-expanded="false"
                aria-controls={collapseId}
            >
                <h2 className="m-0" style={{textTransform: 'uppercase', fontSize: '0.75em'}}>
                    {category.title}
                    <div className="float-right">
                        <span className='mr-3'><ScoreLabel score={2}/></span>
                        <FontAwesomeIcon className='fa-2x' icon={ faCaretDown } />
                    </div>
                </h2>
            </div>
            <div id={collapseId}
                className="collapse"
                aria-labelledby={headingId}
                data-parent="#scorecard"
            >
                <div className="p-0 pb-3 card-body small font-italic">
                    {category.help_text}
                </div>
            </div>
        </div>
    )
}

Category.propTypes = {
    category: PropTypes.object,
    overallScore: PropTypes.number
}

export default Scorecard
