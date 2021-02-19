import React from 'react'

import ReportMissingInfo from 'components/common/ReportMissingInfo'
import StateUpdates from 'components/common/StateUpdates'
import SharedLayout from 'components/SharedLayout'
import UsMap from 'components/UsMap'

export default function Home() {
    return (
        <SharedLayout>
            <UsMap />
            <StateUpdates />
            <ReportMissingInfo />
        </SharedLayout>
    )
}
