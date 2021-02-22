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

export default function State() {
    const router = useRouter()
    const { state } = router.query
    const stateCapitalized = state ? state[0].toUpperCase() + state.substr(1) : ''
    const imageUrl = "https://via.placeholder.com/600x370"
    // TODO: Replace with data from back end.
    const categories = [
        {
            active: true,
            deactivated_at: null,
            help_text: "We cannot begin to address economic abuse (which occurs in 99% of intimate partner violence cases) without properly defining it in state laws.",
            id: 1,
            title: "Economic Abuse Defined in State Laws"
        },
        {
            active: true,
            deactivated_at: null,
            help_text: "Survivors in the U.S. lose an estimated 8 million days of paid work each year dealing with the consequences of the intimate partner violence they’ve experienced. Paid and protected leave ensures survivors do not jeopardize their financial security or risk unemployment by taking time off.",
            id: 2,
            title: "Paid and Protective Leave"
        }
    ]
    return (
        <SharedLayout>
            <div className='state-page'>
                <Breadcrumbs currentPageTitle={ state } />
                <h1>{ stateCapitalized } Survivor Wealth Policy Report</h1>
                <p>How does { stateCapitalized } measure up to supporting survivor wealth?</p>
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
                        <Scorecard categories={categories} overallScore={2} />
                        <div className="understanding-report">
                            <h2 className="mb-0" >Understanding this report</h2>
                            <ScoringGuide />
                            <Glossary />
                            <ModalButton href="/methodology" text="Full methodology" />
                        </div>
                        <TakeAction showPartnerLink />
                    </div>
                </div>
            </div>
        </SharedLayout>
    )
}

// // This function gets called at build time
// export async function getStaticPaths() {
//     // Call an external API endpoint to get posts
//     const res = await fetch('https://.../posts')
//     const posts = await res.json()
//
//     // Get the paths we want to pre-render based on posts
//     const paths = posts.map((post) => `/posts/${post.id}`)
//
//     // We'll pre-render only these paths at build time.
//     // { fallback: false } means other routes should 404.
//     return { paths, fallback: false }
// }
//
// // This function gets called at build time
// export async function getStaticProps() {
//     // Call an external API endpoint to get posts
//     const res = await fetch('https://.../posts')
//     const posts = await res.json()
//
//     // By returning { props: { posts } }, the Blog component
//     // will receive `posts` as a prop at build time
//     return {
//         props: {
//             posts,
//         },
//         revalidate: regenCycle.medium // 12 hours
//     }
// }
