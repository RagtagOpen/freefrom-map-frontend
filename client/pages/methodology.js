import SharedLayout from "components/SharedLayout";
import BackButton from "components/navigation/BackButton";
import PlaceholderText from "components/mock/Placeholder";
import React from "react";

export default function Methodology() {
    return (
        <SharedLayout>
            <BackButton className="mt-3 mb-2" />
            <h1>Methodology</h1>
            <PlaceholderText className="mt-5 mb-2" />
        </SharedLayout>
    )
}