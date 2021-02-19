import React from 'react'

import ReportMissingInfo from 'components/common/ReportMissingInfo'
import ShareButtons from 'components/common/ShareButtons'
import StateUpdates from 'components/common/StateUpdates'
import SharedLayout from 'components/SharedLayout'
import UsMap from 'components/UsMap'

export default function Home() {
    return (
        <SharedLayout>
            <UsMap />
            <div className='d-flex'>
                <StateUpdates />
                <ReportMissingInfo />
                <ShareButtons />
            </div>
        </SharedLayout>
    )
}
