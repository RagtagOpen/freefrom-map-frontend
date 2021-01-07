import React from "react";

import SharedLayout from "components/SharedLayout";
import BackButton from "components/navigation/BackButton";
import PlaceholderText from "components/mock/Placeholder";

export default function Acknowledgements() {
    return (
        <SharedLayout>
            <BackButton className="mt-3 mb-2" />
            <h1>Acknowledgements</h1>
            <PlaceholderText className="mt-5 mb-2" />
        </SharedLayout>
    )
}