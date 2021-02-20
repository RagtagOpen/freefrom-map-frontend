import React from 'react'

import ReportMissingInfo from 'components/common/ReportMissingInfo'
import ShareButtons from 'components/common/ShareButtons'
import StateUpdates from 'components/common/StateUpdates'
import PlaceholderText from "components/mock/Placeholder";
import SharedLayout from 'components/SharedLayout'
import StatesList from 'components/StatesList'
import UsMap from 'components/UsMap'

export default function Home() {
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
                <div className="col-12 col-md-3">
                    <StatesList />
                </div>
                <div className="col-12 col-md-9">
                    <UsMap />
                </div>
                <div className='col-12 mb-4'>
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
