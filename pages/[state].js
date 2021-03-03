import React from "react";

import { useRouter } from 'next/router'
import { regenCycle } from 'constants'

import SharedLayout from "components/SharedLayout";
import Breadcrumbs from "components/common/Breadcrumbs";
import styles from 'components/common/Common.module.css';
import ReportMissingInfo from 'components/common/ReportMissingInfo'
import ScoringGuide from 'components/common/ScoringGuide'
import ShareButtons from 'components/common/ShareButtons'
import StateUpdates from 'components/common/StateUpdates'
import TakeAction from 'components/common/TakeAction'
import Glossary from 'components/common/Glossary';
import ModalButton from "components/modal/ModalButton";
import Scorecard from 'components/Scorecard';

function State({ categories, stateData }) {
    console.log(categories, stateData)
    const router = useRouter()
    const { state } = router.query
    const name = stateData.name;
    const imageUrl = "https://via.placeholder.com/600x370"
    return (
        <SharedLayout>
            <Breadcrumbs currentPageTitle={ state } />
            <h1>{ name } Survivor Wealth Policy Report</h1>
            <p>How does { name } measure up to supporting survivor wealth?</p>
            <div className="row">
                <div className="col-12 col-md-4">
                    <img className="img-fluid" src={imageUrl} />
                    <StateUpdates />
                    <ReportMissingInfo />
                    <ShareButtons className="mb-5" />
                </div>
                <div className="col-12 col-md-7">
                    <div className="float-right">
                        {/* FIXME: add url to report */}
                        <ModalButton href="#" text="Download report" />
                    </div>
                    <Scorecard categories={categories} stateData={stateData} />
                    <h2>Understanding this report</h2>
                    <ScoringGuide />
                    <Glossary />
                    <h2>Take action</h2>
                </div>
            </div>
        </SharedLayout>
    )
}

export async function getStaticPaths() {
    const res = await fetch(process.env.API_ENDPOINT + '/states')
    const states = await res.json()
    return {
        paths: states.map(state => ({ params: { state: state.code }})),
        fallback: true
    };
}

export async function getStaticProps({ params }) {
    const stateResponse = await fetch(process.env.API_ENDPOINT + `/states/${params.state}`)
    const stateData = await stateResponse.json()
    const categoriesResponse = await fetch(process.env.API_ENDPOINT + '/categories?withCriteria=true')
    const categories = await categoriesResponse.json()
    return {
        props: {
            categories,
            stateData,
        },
    }
}

export default State
