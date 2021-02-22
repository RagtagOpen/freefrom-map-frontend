import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import ReportMissingInfo from 'components/common/ReportMissingInfo'
import ShareButtons from 'components/common/ShareButtons'
import StateUpdates from 'components/common/StateUpdates'
import PlaceholderText from 'components/mock/Placeholder'
import SharedLayout from 'components/SharedLayout'
import StatesList from 'components/StatesList'
import UsMap from 'components/UsMap'

export default function Home() {
    // On screens smaller than medium, only show one of the map or list.
    const [visibleComponent, setVisibleComponent] = useState('list');
    const showList = visibleComponent === 'list'
    const mapClass = showList ? ' d-none d-md-block' : ''
    const listClass = showList ? '' : ' d-none d-md-block'
    return (
        <SharedLayout>
            <div className="row">
                <div className="col-12">
                    <h1 className='mt-3'>
                        The National Survivor Wealth Policy Map and Scorecard
                    </h1>
                    <p className='mb-5'>
                        How well does your state support survivors&apos; financial security?
                    </p>
                </div>
                {/* Show toggle button on smaller than medium screens */}
                <div className='col-12 d-sm-block d-md-none mb-3'>
                    <button
                        className='orange-button btn btn-primary'
                        onClick={() => setVisibleComponent(showList ? 'map' : 'list')}>
                        <FontAwesomeIcon icon={ faArrowRight } className="mr-1" />{' '}
                        Switch to {showList ? 'map' : 'list'} view
                    </button>
                </div>
                <div className={`col-sm-12 col-md-3${listClass}`}>
                    <StatesList />
                </div>
                <div className={`col-sm-12 col-md-9${mapClass}`}>
                    <UsMap />
                </div>
                <div className={`col-12 mb-4${mapClass}`}>
                    <div className='float-right'>
                        <div><small>Survivor wealth friendliness</small></div>
                        <div id='legend' style={{height: '40px', width: '200px', backgroundColor: 'blue'}}/>
                    </div>
                </div>
                <div className='col-12 mb-4'>
                    <div className="ml-5 d-flex float-right">
                        {/* FIXME: span is a hack for spacing */}
                        <span className="mr-5">
                            <StateUpdates />
                        </span>
                        <ReportMissingInfo />
                        <ShareButtons className="ml-5" />
                    </div>
                </div>
                <div className="col-12">
                    <h1>About this tool</h1>
                    <PlaceholderText />
                </div>
            </div>
        </SharedLayout>
    )
}
