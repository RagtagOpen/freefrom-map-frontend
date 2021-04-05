import React from 'react'
import SharedLayout from 'components/SharedLayout'
import BackButton from "components/navigation/BackButton";

export default function Disclaimer() {
    return (
        <SharedLayout>
            <BackButton className="mt-3 mb-2" />
            <h1 className="subpage-header">Disclaimer</h1>
            <p>This is an educational and informational tool and the information contained within it does in no way constitute legal advice. Any person who intends to use the information contained herein in any way is solely responsible for independently verifying the information and obtaining independent legal or other expert advice if necessary.</p>
        </SharedLayout>
    )
}
