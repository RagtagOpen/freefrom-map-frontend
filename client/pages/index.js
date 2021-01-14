import React from 'react'
import SharedLayout from 'components/SharedLayout'
import UsMap from 'components/UsMap'
import Modal from "components/modal/Modal";

export default function Home() {
    return (
        <SharedLayout>
            <UsMap />
            <Modal target="state-updates" text="Sign up for state updates" title="Sign up for state updates">
                <h1>Hello</h1>
            </Modal>
        </SharedLayout>
    )
}
