import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

import { useRouter } from 'next/router'
import { regenCycle } from 'constants'

import SharedLayout from "components/SharedLayout";
import PlaceholderText from "components/mock/Placeholder";
import Breadcrumbs from "components/common/Breadcrumbs";
import ReportMissingInfo from 'components/common/ReportMissingInfo'
import StateUpdates from 'components/common/StateUpdates'

export default function State() {
    const router = useRouter()
    const { state } = router.query
    const stateCapitalized = state ? state[0].toUpperCase() + state.substr(1) : ''
    const imageUrl = "https://via.placeholder.com/600x370"
    return (
        <SharedLayout>
            <Breadcrumbs currentPageTitle={ state } />
            <h1>{ stateCapitalized } Survivor Wealth Policy Report</h1>
            <p>How does { stateCapitalized } measure up to supporting survivor wealth?</p>
            <div className="row">
                <div className="col-4">
                    <img className="img-fluid" src={imageUrl} />
                    <StateUpdates />
                    <ReportMissingInfo />
                    <ShareButtons />
                </div>
                <div className="col-7">
                    <PlaceholderText />
                </div>
            </div>
        </SharedLayout>
    )
}

const ShareButtons = () => (
    <>
        <button type="button" className="btn btn-sm btn-primary mr-2">
            <FontAwesomeIcon icon={ faFacebook } className="mr-1" /> Share
        </button>
        <button type="button" className="btn btn-sm btn-primary">
            <FontAwesomeIcon icon={ faTwitter } className="mr-1" /> Tweet
        </button>
    </>
)

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
