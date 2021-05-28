import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

import ScoreLabel from './common/ScoreLabel'
import { OVERALL_SCORE_LABELS } from '../constants'

const resourceLinkType = PropTypes.shape({
    active: PropTypes.bool,
    category_id: PropTypes.number,
    deactivated_at: PropTypes.string,
    id: PropTypes.number,
    state: PropTypes.string,
    text: PropTypes.string,
    url: PropTypes.string
})

const honorableMentionType = PropTypes.shape({
    id: PropTypes.number,
    category_id: PropTypes.number,
    description: PropTypes.string,
    text: PropTypes.string,
    url: PropTypes.string
})

const innovativePolicyIdeaType = PropTypes.shape({
    id: PropTypes.number,
    category_id: PropTypes.number,
    description: PropTypes.string,
    text: PropTypes.string,
    url: PropTypes.string
})

const categoryType = PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    help_text: PropTypes.string,
    criteria: PropTypes.arrayOf(
        PropTypes.shape({
            adverse: PropTypes.bool,
            title: PropTypes.string
        })
    )
})

const criterionScoreType = PropTypes.shape({
    criterion_id: PropTypes.number,
    meets_criterion: PropTypes.string // "yes", "no", "maybe"
})

const categoryGradeType = PropTypes.shape({
    category_id: PropTypes.number,
    grade: PropTypes.number
})

const stateDataType = PropTypes.shape({
    category_grades: PropTypes.arrayOf(categoryGradeType),
    code: PropTypes.string,
    criterion_scores: PropTypes.arrayOf(criterionScoreType),
    grade: PropTypes.shape({
        grade: PropTypes.number
    }),
    honorable_mentions: PropTypes.arrayOf(honorableMentionType),
    innovative_policy_ideas: PropTypes.arrayOf(innovativePolicyIdeaType),
    name: PropTypes.string,
    resource_links: PropTypes.arrayOf(resourceLinkType)
})

const HonorableMention = ({ honorableMentionData }) => (
    <div className='honorable-mention'>
        <div className='d-flex flex-row align-items-center'>
            <img src='/images/honorable-mention.png' className='checklistIcon' alt='Honorable Mention' />
            <h3 className='m-0' style={{ fontSize: '1em' }}>
                Honorable Mention
            </h3>
        </div>

        <p className='card-body small m-0 pt-1'>
            {honorableMentionData.description} (
            <a href={honorableMentionData.url} target='_blank' rel='noopener noreferrer'>
                {honorableMentionData.text}
            </a>
            )
        </p>
    </div>
)

HonorableMention.propTypes = {
    honorableMentionData: honorableMentionType
}

const InnovativePolicyIdea = ({ innovativePolicyIdeaData }) => (
    <div className='honorable-mention'>
        <div className='d-flex flex-row align-items-center'>
            <img src='/images/innovative-idea.png' className='checklistIcon' alt='Innovative Idea' />;
            <h3 className='m-0' style={{ fontSize: '1em' }}>
                Innovative Policy Idea
            </h3>
        </div>

        <p className='card-body small m-0 pt-1'>
            {innovativePolicyIdeaData.description} (
            <a href={innovativePolicyIdeaData.url} target='_blank' rel='noopener noreferrer'>
                {innovativePolicyIdeaData.text}
            </a>
            )
        </p>
    </div>
)

InnovativePolicyIdea.propTypes = {
    innovativePolicyIdeaData: innovativePolicyIdeaType
}

const renderIcon = (implementsPolicy) => {
    switch (implementsPolicy) {
        case 'yes':
            return <img src='/images/criteria-met.png' className='checklistIcon' alt='Criteria Met' />
        case 'maybe':
            return <img src='/images/criteria-maybe-met.png' className='checklistIcon' alt='Criteria Maybe Met' />
        case 'no':
            return <img src='/images/criteria-not-met.png' className='checklistIcon' alt='Criteria Not Met' />
    }
}

const Policy = ({ policyData, score }) => (
    <p className='card-body small m-0 d-flex flex-row'>
        {renderIcon(score.meets_criterion)}
        {policyData.title}
    </p>
)

Policy.propTypes = {
    policyData: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        adverse: PropTypes.bool
    }),
    score: PropTypes.shape({
        meets_criterion: PropTypes.string
    })
}

const ResourceLink = ({ link }) => (
    <p className='card-body small m-0 py-1 d-flex flex-row'>
        <strong>
            <a href={link.url} target='_blank' rel='noopener noreferrer'>
                {link.text}
            </a>
        </strong>
    </p>
)

ResourceLink.propTypes = { link: resourceLinkType }

function meetsCriterion(criterion) {
    return criterion.score && criterion.score.meets_criterion === 'yes'
}

const NoPolicies = ({ adverse }) => (
    <p className='card-body small m-0 d-flex flex-row'>
        This state does not have {adverse ? 'adverse' : 'model'} policies in this category.
    </p>
)

NoPolicies.propTypes = { adverse: PropTypes.bool }

const Category = ({ category, expanded, onClickExpand, stateData }) => {
    const criteriaWithScores = category.criteria.map((criteria) => {
        const score = stateData.criterion_scores.find((score) => score.criterion_id === criteria.id)
        return {
            ...criteria,
            score
        }
    })
    const categoryScore = stateData.category_grades.find((c) => c.category_id === category.id) || {}
    const honorableMentionData = stateData.honorable_mentions.find((hm) => hm.category_id === category.id) || null
    const innovativePolicyIdeaData =
        stateData.innovative_policy_ideas.find((ip) => ip.category_id === category.id) || null
    const positiveHasPolicies = criteriaWithScores.filter((c) => !c.adverse && meetsCriterion(c)) || []
    const positiveMissingPolicies = criteriaWithScores.filter((c) => !c.adverse && !meetsCriterion(c)) || []
    const adverseHasPolicies = criteriaWithScores.filter((c) => c.adverse && meetsCriterion(c)) || []
    const adverseMissingPolicies = criteriaWithScores.filter((c) => c.adverse && !meetsCriterion(c)) || []
    const collapseId = `collapse-${category.id}`
    const headingId = `heading-${category.id}`
    const links = stateData.resource_links.filter((l) => l.category_id === category.id && l.active) || []
    const categoryImageName = category.title.replace(/\(|\)/g, '').replace(/\s/g, '-').toLowerCase()

    return (
        <div className='category accordion-i' style={{ borderTop: '1px solid black' }}>
            <button
                id={headingId}
                className='pt-3 pb-3 btn hide w-100'
                // type='button'
                data-toggle='collapse'
                data-target={`#${collapseId}`}
                aria-expanded='false'
                aria-controls={collapseId}
                onClick={onClickExpand}
            >
                <h2
                    className='m-0 d-flex flex-row justify-content-between'
                    style={{ textTransform: 'uppercase', fontSize: '0.75em', fontWeight: 300 }}
                >
                    <div>
                        <div className='d-block d-lg-none mt-2'>{category.title}</div>
                        <img
                            className='img img-fluid mr-4'
                            src={`../images/policy-category-icons/${categoryImageName}.png`}
                            alt={`${category.title} logo`}
                            height='60px'
                            width='60px'
                        />
                        <div className='d-none d-lg-inline-flex'>{category.title}</div>
                    </div>
                    <div className='d-flex flex-row justify-content-between mt-2'>
                        <span className='mr-3'>
                            <ScoreLabel score={categoryScore.grade} type='category' />
                        </span>
                        <FontAwesomeIcon className='fa-2x' icon={expanded ? faCaretUp : faCaretDown} />
                    </div>
                </h2>
            </button>
            <div id={collapseId} className='collapse' aria-labelledby={headingId} data-parent='#scorecard'>
                <div className='p-0 pb-3 card-body small'>{category.help_text}</div>
                {honorableMentionData ? <HonorableMention honorableMentionData={honorableMentionData} /> : null}
                {innovativePolicyIdeaData ? (
                    <InnovativePolicyIdea innovativePolicyIdeaData={innovativePolicyIdeaData} />
                ) : null}
                <div className='policies positive model p-0 card-body small'>
                    <h3 className='m-0 py-2 px-3' style={{ fontSize: '1em' }}>
                        Positive policies this state has
                    </h3>
                    {positiveHasPolicies.length > 0 ? (
                        positiveHasPolicies.map((policy) => {
                            return <Policy policyData={policy} score={policy.score} key={policy.id} />
                        })
                    ) : (
                        <NoPolicies />
                    )}
                </div>

                <div className='policies adverse p-0 card-body small'>
                    <h3 className='m-0 py-2 px-3' style={{ fontSize: '1em' }}>
                        Adverse policies this state has
                    </h3>
                    {adverseHasPolicies.length > 0 ? (
                        adverseHasPolicies.map((policy) => {
                            return <Policy policyData={policy} score={policy.score} key={policy.id} />
                        })
                    ) : (
                        <NoPolicies adverse />
                    )}
                </div>

                <div className='policies positive-missing p-0 card-body small'>
                    <h3 className='m-0 py-2 px-3' style={{ fontSize: '1em' }}>
                        Positive policies this state should adopt
                    </h3>
                    {positiveMissingPolicies.length > 0 ? (
                        positiveMissingPolicies.map((policy) => {
                            return <Policy policyData={policy} score={policy.score} key={policy.id} />
                        })
                    ) : (
                        <NoPolicies />
                    )}
                </div>

                <div className='policies adverse-avoid p-0 card-body small'>
                    <h3 className='m-0 py-2 px-3' style={{ fontSize: '1em' }}>
                        Adverse policies this state should avoid
                    </h3>
                    {adverseMissingPolicies.length > 0 ? (
                        adverseMissingPolicies.map((policy) => {
                            return <Policy policyData={policy} score={policy.score} key={policy.id} />
                        })
                    ) : (
                        <NoPolicies adverse />
                    )}
                </div>

                <div className='adverse-policies p-0 card-body mb-3 small'>
                    <h3 className='m-0' style={{ fontSize: '1em' }}>
                        Related sources:
                    </h3>
                    {links.length > 0 ? (
                        links.map((link) => <ResourceLink link={link} key={link.id} />)
                    ) : (
                        <p className='card-body small m-0 d-flex flex-row'>
                            No {category.title} resources found for {stateData.name}.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

Category.propTypes = {
    category: categoryType,
    stateData: stateDataType,
    expanded: PropTypes.bool,
    onClickExpand: PropTypes.func
}

const Scorecard = ({ categories, stateData }) => {
    const [expanded, setExpanded] = useState(null)
    return (
        <div className='scorecard-container'>
            <div className='overall d-flex flex-wrap mt-4 mb-3'>
                <span className='label mr-2'>Overall:</span>
                <ScoreLabel score={stateData.grade.grade} />
            </div>
            <p>{OVERALL_SCORE_LABELS[stateData.grade.grade]}</p>
            <div className='scorecard accordion' id='scorecard'>
                {categories.map((category) => {
                    const isExpanded = expanded === category.id
                    const onClickExpand = () => setExpanded(isExpanded ? null : category.id)
                    return (
                        <Category
                            category={category}
                            expanded={isExpanded}
                            key={category.id}
                            onClickExpand={onClickExpand}
                            stateData={stateData}
                        />
                    )
                })}
            </div>
        </div>
    )
}

Scorecard.propTypes = {
    categories: PropTypes.arrayOf(categoryType),
    overallScore: PropTypes.number,
    stateData: stateDataType
}

export default Scorecard
