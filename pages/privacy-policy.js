import React from 'react'
import SharedLayout from 'components/SharedLayout'
import BackButton from "components/navigation/BackButton";
import PlaceholderText from "components/mock/Placeholder";

export default function PrivacyPolicy() {
    return (
        <SharedLayout>
            <BackButton className="mt-3 mb-2" />
            <h1>Privacy Policy</h1>
            <PlaceholderText className="mt-5 mb-2" />
        </SharedLayout>
    )
}