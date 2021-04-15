import React from "react";

import { useRouter } from 'next/router'

import SharedLayout from "components/SharedLayout";
import Breadcrumbs from "components/common/Breadcrumbs";
import ReportMissingInfo from 'components/common/ReportMissingInfo'
import ScoringGuide from 'components/common/ScoringGuide'
import ShareButtons from 'components/common/ShareButtons'
import StateUpdates from 'components/common/StateUpdates'
import TakeAction from 'components/common/TakeAction'
import Glossary from 'components/common/Glossary';
import ModalButton from "components/modal/ModalButton";
import Scorecard from 'components/Scorecard';
import { toSlug } from 'utils';

function State({ categories, stateData }) {
    const router = useRouter()
    const { state } = router.query
    const { name } = stateData;
    const imageUrl = "../images/states/" + state + ".png"
    return (
        <SharedLayout>
            <div className='state-page'>
                <Breadcrumbs currentPageTitle={ state } />
                <h1>{ name } Survivor Financial Security Policy Scorecard</h1>
                <p>How well does { name } support survivors’ financial security?</p>
                <div className="row">
                    <div className="col-12 col-md-4">
                        <img className="img-fluid mb-3" src={imageUrl} />
                        <h4 className="mb-0">Key</h4>
                        <img className="img-fluid my-3" src="/images/key.png" />
                        <StateUpdates />
                        <ReportMissingInfo />
                        <ShareButtons className="mt-3 mb-5" />
                    </div>
                    <div className="col-12 col-md-7">
                        <Scorecard categories={categories} stateData={stateData} />
                        <div className="understanding-report">
                            <h2 className="mb-0" >Understanding this report</h2>
                            <ScoringGuide />
                            <Glossary />
                            <ModalButton href="/methodology" text="Full methodology" />
                        </div>
                        <TakeAction/>
                    </div>
                </div>
            </div>
        </SharedLayout>
    )
}

export async function getStaticPaths() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/states?details=false')
    const states = await res.json()
    return {
        paths: states.map(state => ({ params: { state: toSlug(state.name) }})),
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    // Get all states so that we find the state code from the name param.
    const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/states?details=false')
    const states = await res.json()
    const state = states.find(s => toSlug(s.name) === params.state)
    // Fetch state data by code.
    const stateResponse = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/states/${state.code}`)
    const stateData = await stateResponse.json()
    const categoriesResponse = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/categories?withCriteria=true')
    const categories = await categoriesResponse.json()
    return {
        props: {
            categories,
            stateData,
        },
    }
}

export default State
