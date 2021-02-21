import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import { useRouter } from 'next/router'
import { regenCycle } from 'constants'

import Modal from "components/modal/Modal";
import SharedLayout from "components/SharedLayout";
import Breadcrumbs from "components/common/Breadcrumbs";
import ReportMissingInfo from 'components/common/ReportMissingInfo'
import ScoreLabel from 'components/common/ScoreLabel'
import ScoringGuide from 'components/common/ScoringGuide'
import ShareButtons from 'components/common/ShareButtons'
import StateUpdates from 'components/common/StateUpdates'
import Glossary from 'components/common/Glossary';
import ModalButton from "components/modal/ModalButton";

export default function State() {
    const router = useRouter()
    const { state } = router.query
    const stateCapitalized = state ? state[0].toUpperCase() + state.substr(1) : ''
    const imageUrl = "https://via.placeholder.com/600x370"
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
                        <ModalButton href="#" text="Download report" />
                    </div>
                    <div className='mt-5 mb-3'>
                        <span className='mr-2' style={{fontSize: '1.2em', fontWeight: 400, textTransform: 'uppercase'}}>Overall:</span>
                        <ScoreLabel score={2}/>
                    </div>
                    <p><em>This state prioritizes...</em></p>
                    <div className="accordion" id="accordionExample">
                        {categories.map(category => (
                            <CategoryCard category={category} key={category.id} />
                        ))}
                    </div>
                    <h2>Understanding this report</h2>
                    <ScoringGuide />
                    <Glossary />
                    <h2>Take action</h2>
                </div>
            </div>
        </SharedLayout>
    )
}

const CategoryCard = ({ category }) => {
    const collapseId = `collapse-${category.id}`
    const headingId = `heading-${category.id}`
    return (
        <div style={{borderTop: '1px solid black'}}>
            <div className="pt-3 pb-3" id={headingId} type="button" data-toggle="collapse" data-target={`#${collapseId}`} aria-expanded="false" aria-controls={collapseId}>
                <h2 className="m-0" style={{textTransform: 'uppercase', fontSize: '0.75em'}}>
                    {category.title}
                    <div className="float-right">
                        <span className='mr-3'><ScoreLabel score={2}/></span>
                        <FontAwesomeIcon className='fa-2x' icon={ faCaretDown } />
                    </div>
                </h2>
            </div>
            <div id={collapseId} className="collapse pb-3" aria-labelledby={headingId} data-parent="#accordionExample">
                <div className="p-0 card-body small font-italic">
                    {category.help_text}
                </div>
            </div>
        </div>
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
