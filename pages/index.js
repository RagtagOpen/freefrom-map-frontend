import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import ReportMissingInfo from 'components/common/ReportMissingInfo'
import ShareButtons from 'components/common/ShareButtons'
import StateUpdates from 'components/common/StateUpdates'
import SharedLayout from 'components/SharedLayout'
import StatesList from 'components/StatesList'
import UsMap from 'components/UsMap'
import ModalButton from 'components/modal/ModalButton'
import Image from 'next/image'

function Home({ states }) {
    const [visibleComponent, setVisibleComponent] = useState('list');
    const showList = visibleComponent === 'list'
    const mapClass = showList ? ' d-none d-md-block' : ''
    const listClass = showList ? '' : ' d-none d-md-block'

    return (
        <SharedLayout>
            <>
                <h1 className='mt-3'>
                    The National Survivor Wealth Policy Map and Scorecard
                </h1>
                <p className='mb-5'>
                    How well does your state support survivors’ financial security?
                </p>
            </>

            <div className='d-sm-block d-md-none mb-3'>
                <button
                    className='orange-button btn btn-primary'
                    onClick={() => setVisibleComponent(showList ? 'map' : 'list')}>
                    <FontAwesomeIcon icon={ faArrowRight } className="mr-1" />{' '}
                    Switch to {showList ? 'map' : 'list'} view
                </button>
            </div>

            <div className='d-flex flex-row flex-fill'>
                <div className={`col-md-3 p-0${listClass}`} style={{ minWidth: '300px' }}>
                    <StatesList states={states} />
                </div>

                <div className={`col-md-9${mapClass}`}>
                    <UsMap states={states} />
                </div>
            </div>

            <div aria-hidden='true' className={`d-md-flex flex-row justify-content-end${mapClass}`}>
                <div className='d-flex flex-column'>
                    <Image src="/images/legend.png" height="97" width="449"/>
                </div>
            </div>

            <div className='d-md-flex flex-row justify-content-end mt-5'>
                <div className='d-flex flex-column flex-md-row justify-content-md-between' style={{minWidth: '60%'}}>
                    <div className='pr-3'>
                        <StateUpdates />
                    </div>
                    <div className='pr-3'>
                        <ReportMissingInfo />
                    </div>
                    <ShareButtons className='d-flex flex-row flex-nowrap' />
                </div>
            </div>

            <>
                <h2>About this tool</h2>
                <p>The #1 obstacle to a survivor’s long-term safety is financial insecurity. This means that we cannot disrupt the cycle of intimate partner violence in the U.S. until we move beyond the current focus on crisis response and prioritize policies that support financial security and long-term safety for survivors and their families. That is, we must prioritize policies that support survivor wealth.</p>
                <p>Our National Survivor Wealth Policy Map and Scorecard (Policy Map and Scorecard) acts as both a resource and a roadmap for action. For each state, the map outlines the existing laws impacting a survivor’s ability to build and maintain financial security, and provides state-specific policy recommendations that will ensure that all survivors have access to the financial resources and support they need to thrive and live free from abuse.</p>
                <h3>What does it do?</h3>
                <ul>
                    <li>Provides accessible and plain language information about the laws in each state that impact a survivor’s ability to build financial security</li>
                    <li>Evaluates how well each state supports survivors in building financial security based on these laws</li>
                    <li>Offers state-specific and survivor-centered policy recommendations for how each state can better prioritize financial security for survivors</li>
                    <li>Provides quick and easy ways for users to take action, contribute to the policy making process, and engage with state lawmakers to pass policies that better support survivors in their state</li>
                </ul>
                <h3>Who is it for?</h3>
                <p>The short answer is: everyone! Our tool is perfect for:</p>
                <ul>
                    <li>Folks who want to learn more about the laws in their state and how they compare to others across the U.S.</li>
                    <li>Folks who want to take action and advocate for better and more supportive policies for survivors in their state</li>
                    <li>Elected officials and those working in legislative offices</li>
                    <li>Survivors who are interested in learning more about, and getting engaged in, the policy-making process in their state</li>
                </ul>
                <p>We’ve designed this tool to work for you – so feel free to use it in whatever way feels right!</p>
                <h2>Important information</h2>
                <p>The National Survivor Wealth Policy Map and Scorecard evaluates legislation in each state that has either been passed or enacted. While we understand that there are an endless number of policies and issues that impact survivors’ ability to build wealth, we’ve selected policies that we have determined are most directly linked to a survivor’s ability to build and maintain financial security. This is a living tool, which means it will be regularly updated and expanded. Be sure to read the full methodology to learn more!</p>
                <h2>Methodology</h2>
                <p>We evaluated each state based on whether and to what extent its policies aligned with and provided the same protections as our set of model policies, the characteristics of which are included in each state’s scorecard. The scorecard only includes state-level policies and does not capture local policies or those that can only be addressed on the federal level.</p>
                <p>While survivors’ ability to build financial security is impacted by a wide range of policies, we chose the thirteen policy categories currently included within our scorecard after determining that they were most directly connected with survivors’ ability to protect their assets and build and save wealth.</p>
                <p>While practice and policy may differ, the scorecard only measures policies as they are codified in state laws.</p>
                <ModalButton text="Full Methodology" href="/methodology"/>
            </>
        </SharedLayout>
    );
}

Home.propTypes = {
    states: PropTypes.arrayOf(PropTypes.shape({
        grade: PropTypes.shape({
            grade: PropTypes.number
        }),
        name: PropTypes.string
    }))
}


export async function getStaticProps() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/states?details=false')
    const states = await res.json()
    return {
        props: {
            states,
        },
    }
}

export default Home
