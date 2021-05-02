import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ReportMissingInfo from 'components/common/ReportMissingInfo'
import ShareButtons from 'components/common/ShareButtons'
import StateUpdates from 'components/common/StateUpdates'
import TakeAction from 'components/common/TakeAction'
import SharedLayout from 'components/SharedLayout'
import StatesList from 'components/StatesList'
import UsMap from 'components/UsMap'

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

            <div className='d-flex flex-row flex-fill'>
                <div className={`col-md-3 p-0${listClass}`} style={{ minWidth: '300px' }}>
                    <StatesList states={states} />
                </div>

                <div className={`col-md-9${mapClass}`}>
                    <div aria-hidden='true' className={`mb-4 ml-3 d-md-flex flex-row justify-content-start${mapClass}`}>
                        <div className='d-flex flex-column'>
                            <h4 className="mb-1">Key</h4>
                            <img className="img-fluid" src="/images/legend.png" style={{maxWidth: '415px'}}/>
                        </div>
                    </div>
                    <UsMap states={states} />


                </div>
            </div>

            <div className='d-md-flex flex-row justify-content-start mt-4'>
                <div className='d-flex flex-column flex-md-row' style={{minWidth: '60%'}}>
                    <div className='pr-3 mb-3'>
                        <ShareButtons className='d-flex flex-row flex-nowrap' />
                    </div>
                    <div className='pr-3 mb-3'>
                        <StateUpdates />
                    </div>
                    <div className='pr-3'>
                        <ReportMissingInfo />
                    </div>
                </div>
            </div>

            <>

                <h2 className='mt-4'>Snapshot of Survivor Financial Security Policies By State</h2>
                <img className="img-fluid" src="/images/snapshot-by-state.png" style={{width: '100%', maxWidth: '1000px'}}/>

                <h2 className='mt-5'>States to Watch</h2>
                <div className="d-flex flex-column col-lg-10 m-0 p-0">
                    <div className='d-flex flex-row flex-wrap flex-md-nowrap mb-3'>
                        <div className="mr-md-3">
                            <img src="/images/states/maine.png" height="200px" width="200px"/>
                        </div>
                        <div>
                            <strong className="state-to-watch-headline mb-3">Maine leads the way in protecting survivors against coerced and fraudulent debt</strong>
                            <p className="state-to-watch-text mb-1">Maine recently passed strong legislation that prevents debt collectors from collecting on debts incurred as a result of economic abuse, providing survivors with much needed relief.</p>
                            <a className="state-to-watch-text" href="https://www.mainelegislature.org/legis/statutes/10/title10sec1310-H.html" target="_blank" rel="noopener noreferrer">Me. Stat. tit. 10, § 1310-H</a>
                        </div>
                    </div>
                    <div className='d-flex flex-row flex-wrap flex-md-nowrap mb-3'>
                        <div className="mr-md-3">
                            <img src="/images/states/washington.png" height="200px" width="200px"/>
                        </div>
                        <div>
                            <strong className="state-to-watch-headline mb-3">Washington demonstrates how to protect survivors against litigation abuse</strong>
                            <p className="state-to-watch-text mb-1">Washington gives survivors the most comprehensive protections against litigation abuse in the nation. The State requires harm-doers to pay attorneys’ fees and costs associated with abusive litigation tactics, holding them accountable for misusing the court system to further harm and abuse survivors.</p>
                            <a className="state-to-watch-text" href="https://app.leg.wa.gov/RCW/default.aspx?cite=26.51&full=true#26.51.010" target="_blank" rel="noopener noreferrer">Wash. Rev. Code § 26.51.010 - 901</a>
                        </div>
                    </div>
                    <div className='d-flex flex-row flex-wrap flex-md-nowrap mb-3'>
                        <div className="mr-md-3">
                            <img src="/images/states/nevada.png" height="200px" width="200px"/>
                        </div>
                        <div className='pr-3'>
                            <strong className="state-to-watch-headline mb-3">Nevada is <em>so close</em> to model paid and protected leave</strong>
                            <p className="state-to-watch-text mb-1">Nevada offers at least 10 days of protected leave for survivors to deal with the consequences of abuse that does not deplete accrued leave. If Nevada were to guarantee that the leave is paid it would be a Model policy.</p>
                            <a className="state-to-watch-text" href="https://www.leg.state.nv.us/nrs/nrs-608.html#NRS608Sec0198" target="_blank" rel="noopener noreferrer">N.R.S. § 608.0198</a>
                        </div>
                    </div>
                </div>

                <h2 className='mt-5'>Snapshot of Survivor Financial Security Policies By Category</h2>
                <img className="img-fluid mb-5" src="/images/snapshot-by-category.png" style={{width: '100%', maxWidth: '1000px'}} />

                <TakeAction />

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
