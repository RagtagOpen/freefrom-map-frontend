import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import ReportMissingInfo from 'components/common/ReportMissingInfo'
import ShareButtons from 'components/common/ShareButtons'
import StateUpdates from 'components/common/StateUpdates'
import SharedLayout from 'components/SharedLayout'
import StatesList from 'components/StatesList'
import UsMap from 'components/UsMap'
import ModalButton from 'components/modal/ModalButton'
import Image from 'next/image'

function Home({ states }) {
    const [visibleComponent, setVisibleComponent] = useState('list');
    const showList = visibleComponent === 'list'
    const mapClass = showList ? ' d-none d-md-block' : ''
    const listClass = showList ? '' : ' d-none d-md-block'
    return (
        <SharedLayout>
            <>
                <h1 className='mt-3'>
                    The National Survivor Financial Security Policy Map and Scorecard
                </h1>
                <p className='mb-4'>
                    How well does your state support survivors’ financial security?
                </p>
            </>

            <div className='d-sm-block d-md-none mb-3'>
                <button
                    className='orange-button btn btn-primary'
                    onClick={() => setVisibleComponent(showList ? 'map' : 'list')}>
                    <FontAwesomeIcon icon={ faArrowRight } className="mr-1" />{' '}
                    Switch to {showList ? 'map' : 'list'} view
                </button>
            </div>

            <div className='d-flex flex-row flex-fill'>
                <div className={`col-md-3 p-0${listClass}`} style={{ minWidth: '300px' }}>
                    <StatesList states={states} />
                </div>

                <div className={`col-md-9${mapClass}`}>
                    <UsMap states={states} />
                </div>
            </div>

            <div aria-hidden='true' className={`d-md-flex flex-row justify-content-end${mapClass}`}>
                <div className='d-flex flex-column'>
                    <h4 className="mb-0">Key</h4>
                    <Image src="/images/legend.png" height="129" width="230"/>
                </div>
            </div>

            <div className='d-md-flex flex-row justify-content-end mt-5'>
                <div className='d-flex flex-column flex-md-row justify-content-md-between' style={{minWidth: '60%'}}>
                    <div className='pr-3'>
                        <StateUpdates />
                    </div>
                    <div className='pr-3'>
                        <ReportMissingInfo />
                    </div>
                    <ShareButtons className='d-flex flex-row flex-nowrap' />
                </div>
            </div>

            <>

                <h2 className='mt-5'>Snapshot of Survivor Financial Security Policies By State</h2>
                <img className="img-fluid" src="/images/snapshot-by-state.png" />

                <h2 className='mt-5'>Snapshot of Survivor Financial Security Policies By Category</h2>
                <img className="img-fluid" src="/images/snapshot-by-category.png" />

                <h2 className='mt-5'>States to Watch</h2>
                <div className="d-flex justify-content-lg-around justify-content-center align-items-center flex-column flex-md-row p-2">
                    <div className='d-flex flex-column flex-md-row justify-content-md-between' style={{minWidth: '60%'}}>
                        <div className='pr-3 mb-3'>
                            <h3 className="mb-3">Maine</h3>
                            <strong className="mb-3">Maine leads the way in protecting survivors against coerced and fraudulent debt</strong>
                            <img className="img-fluid mb-3" src="/images/state-outlines/maine.png" />
                            <p className="mb-1">Maine recently passed strong legislation that prevents debt collectors from collecting on debts incurred as a result of economic abuse, providing survivors with much needed relief.</p>
                            <a href="https://legislature.maine.gov/statutes/32/title32sec11013.html" target="_blank" rel="noopener noreferrer">Me. Stat. tit. 32, § 11013</a>
                        </div>
                        <div className='pr-3 mb-3'>
                            <h3 className="mb-3">Washington</h3>
                            <strong className="mb-3">Washington demonstrates how to protect survivors against litigation abuse</strong>
                            <img className="img-fluid mb-3" src="/images/state-outlines/washington.png" />
                            <p className="mb-1">Washington gives survivors the most comprehensive protections against litigation abuse in the nation. The State requires harm-doers to pay attorneys’ fees and costs associated with abusive litigation tactics, holding them accountable for misusing the court system to further harm and abuse survivors.</p>
                            <a href="" target="_blank" rel="noopener noreferrer">Link goes here</a>
                        </div>
                        <div className='pr-3 mb-3'>
                            <h3 className="mb-3">Nevada</h3>
                            <strong className="mb-3">Nevada is <em>so close</em> to model paid and protected leave</strong>
                            <img className="img-fluid mb-3" src="/images/state-outlines/nevada.png" />
                            <p className="mb-1">Nevada offers at least 10 days of protected leave for survivors to deal with the consequences of abuse that does not deplete accrued leave. If Nevada were to guarantee that the leave is paid it would be a Model policy.</p>
                            <a href="https://www.leg.state.nv.us/nrs/nrs-608.html#NRS608Sec0198" target="_blank" rel="noopener noreferrer">N.R.S. § 608.0198</a>
                        </div>
                    </div>
                </div>

                <h2 className='mt-5'>Important information</h2>
                <p>The National Survivor Financial Security Policy Map and Scorecard evaluates legislation in each state that has either been passed or enacted. While we understand that there are an endless number of policies and issues that impact survivors’ ability to build wealth, we’ve selected policies that we have determined are most directly linked to a survivor’s ability to build and maintain financial security. This is a living tool, which means it will be regularly updated and expanded. Be sure to read the full methodology to learn more!</p>

                <h2 className='mt-5'>Methodology</h2>
                <p>We evaluated each state based on whether and to what extent its policies aligned with and provided the same protections as our set of model policies, the characteristics of which are included in each state’s scorecard. The scorecard only includes state-level policies and does not capture local policies or those that can only be addressed on the federal level.</p>
                <p>While survivors’ ability to build financial security is impacted by a wide range of policies, we chose the thirteen policy categories currently included within our scorecard after determining that they were most directly connected with survivors’ ability to protect their assets and build and save wealth.</p>
                <p>While practice and policy may differ, the scorecard only measures policies as they are codified in state laws.</p>
                <ModalButton text="Full Methodology" href="/methodology"/>

            </>
        </SharedLayout>
    );
}

Home.propTypes = {
    states: PropTypes.arrayOf(PropTypes.shape({
        grade: PropTypes.shape({
            grade: PropTypes.number
        }),
        name: PropTypes.string
    }))
}


export async function getStaticProps() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/states?details=false')
    let states = await res.json()
    // Assign rank to states list
    let lastTotal = Infinity
    let lastRank = 0
    states = states
        .sort((a, b) => b.total - a.total)
        .map((state, i) => {
            if (state.total === lastTotal) {
                // If there's a tie, use the previous rank.
                state.rank = lastRank
            }
            if (state.total < lastTotal) {
                // Get the next ranking (accounting for the gap left by any
                // previous ties).
                const newRank = i + 1 > lastRank ? i + 1 : lastRank + 1
                // Update the last rank/total and set the state rank value
                state.rank = lastRank = newRank
                lastTotal = state.total
            }
            return state
        })
    return {
        props: {
            states,
        },
    }
}

export default Home
