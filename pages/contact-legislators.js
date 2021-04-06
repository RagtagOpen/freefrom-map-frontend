import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

import BackButton from "components/navigation/BackButton";
import { site } from "constants/index"
import SharedLayout from "components/SharedLayout";

import Input from "components/forms/Input";
import Submit from "components/forms/Submit";

import TakeAction from "components/common/TakeAction";

/**
 * This method uses the Google Civic Info API to get representatives for a zip
 * code. API documentation is here:
 * https://developers.google.com/civic-information/docs/v2/representatives/representativeInfoByAddress
 */
async function getRepresentativesByAddress (addressInput) {
    const res = await fetch(`https://content-civicinfo.googleapis.com/civicinfo/v2/representatives?address=${addressInput}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&roles=legislatorUpperBody&roles=legislatorLowerBody&roles=headOfGovernment&roles=deputyHeadOfGovernment&levels=administrativeArea1`)
    const json = await res.json()
    json.offices.forEach(office => {
        office.officialIndices.forEach(i => json.officials[i].name = `${office.name} ${json.officials[i].name}`)
    })
    return json.officials
}

function ContactLegislators() {
    const [officials, setOfficials] = useState([])
    const submitZipCode = async values => {
        const officials = await getRepresentativesByAddress(values.zip_code)
        setOfficials(officials)
    }
    return (
        <div>
            <Head>
                <title>Contact Your Legislators - { site.name }</title>
            </Head>
            <SharedLayout>
                <BackButton className="mt-3 mb-2" />
                <h1 className="subpage-header">Contact Your Legislators</h1>
                <Formik
                    initialValues={{}}
                    onSubmit={submitZipCode}
                >
                    <Form className="col-9">
                        <Input
                            label="Enter your zip code or full address:"
                            name="zip_code"
                            required={ true }
                            smallText='Your information will not be stored or used in any way except to show you your elected officials. For your state legislators, please include your full street address.'
                            className="mb-0"
                        />
                        <Submit />
                    </Form>
                </Formik>
                <div className='mb-3 pl-3' >
                    {officials.map(o => <Official key={o.name} official={o} />)}
                </div>
                <div className='mb-5 pl-3' >
                    <strong>Sample phone message</strong>
                    <p>Hello, (<em>optional:</em> my name is __, and) I am a constituent in your district. The #1 obstacle to safety for survivors of intimate partner violence is financial insecurity. I am calling because [state] can and must do more to help survivors build the financial security they need to stay safe. I urge you to visit FreeFrom’s National Financial Security Policy Map and Scorecard to see specific recommendations for how we can make policy changes to prioritize financial security and long-term safety for survivors in our state. Visit FreeFrom.org and check out the map to learn more. Thank you.</p>
                </div>
                <TakeAction />
            </SharedLayout>
        </div>
    )
}

const Official = ({official}) => (
    <div>
        <p>{official.name}</p>
        <ul className='list-inline small'>
            {<Channels channels={official.channels} />}
            {<Comms type='email' items={official.emails} />}
            {<Comms type='phone' items={official.phones} />}
        </ul>
    </div>
)

const SUBJECT = 'We need to prioritize the financial security of survivors of intimate partner violence'
const BODY = 'Dear [Representative name],%0D%0A%0D%0ASurvivors of intimate partner violence need more legislative support to protect survivors of intimate partner violence.%0D%0A%0D%0A[Why this issue is important to me.]%0D%0A%0D%0ASincerely,%0D%0A%0D%0A[Your name]'

const getUrlForType = (type, value) => {
    switch (type) {
    case 'Twitter': return `https://twitter.com/intent/tweet?text=@${value}`
    case 'Facebook': return `https://facebook.com/${value}`
    case 'email': return `mailto:${value}?subject=${SUBJECT}&body=${BODY}`
    case 'phone': return `tel:${value}`
    }
}

const Channels = ({channels}) => (
    <>
        {channels && channels.length > 0
            ? channels.map(c => {
                const icon = c.type === 'Twitter'
                    ? faTwitter
                    : c.type === 'Facebook'
                        ? faFacebook
                        : faInstagram
                return (
                    <li className='list-inline-item mr-3' key={`${c.type}-${c.id}`}>
                        <FontAwesomeIcon icon={ icon } className="mr-1" />
                        <a
                            href={getUrlForType(c.type, c.id)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {c.type === 'Twitter' && '@'}{c.id}
                        </a>
                    </li>
                )}
            )
            : <li className='list-inline-item mr-3'>[No social media found]</li>
        }
    </>
)

const Comms = ({items, type}) => {
    const icon = type === 'email' ? faEnvelope : faPhone
    return (
        <>
            {items && items.length > 0
                ? items.map(item => (
                    <li className='list-inline-item mr-3' key={item}>
                        <FontAwesomeIcon icon={ icon } className="mr-1" />
                        <a
                            href={getUrlForType(type, item)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {item}
                        </a>
                    </li>
                ))
                : <span></span>
            }
        </>
    )
}

export default ContactLegislators
