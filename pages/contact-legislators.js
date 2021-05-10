import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

import BackButton from "components/navigation/BackButton";
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
        <SharedLayout title="Contact Your Legislators">
            <BackButton className="mt-3 mb-2" />
            <h1 className="subpage-header">Contact Your Legislators</h1>
            <Formik
                initialValues={{}}
                onSubmit={submitZipCode}
            >
                <Form className="col-12 col-md-9">
                    <Input
                        label="Enter your zip code or full address:"
                        name="zip_code"
                        required={ true }
                        smallText='Your information will not be stored or used in any way except to show you your elected officials. For state elected officials in your district, please use your full street address. Information for the District of Columbia is not available at this time.'
                        className="mb-0"
                    />
                    <Submit />
                </Form>
            </Formik>
            <div className='col-12 col-md-9 mb-5 pl-3' >
                {officials.map(o => <Official key={o.name} official={o} />)}
            </div>
            <div className='col-12 col-md-9 mb-5 pl-3' >
                <strong>Sample phone message</strong>
                <p>Hello, (optional: my name is __, and) I am a constituent in your district. The #1 obstacle to safety for survivors of intimate partner violence is financial insecurity. I am calling because [state] can and must do more to help survivors build the financial security they need to stay safe. I urge you to visit FreeFrom’s National Financial Security Policy Map and Scorecard to see specific recommendations for how we can make policy changes to prioritize financial security and long-term safety for survivors in our state. Visit FreeFrom.org and check out the map to learn more. Thank you.</p>
            </div>
            <TakeAction />
        </SharedLayout>
    )
}

const Official = ({official}) => (
    <div>
        <p>{official.name}</p>
        <ul className='list-inline small'>
            {<Channels channels={official.channels.filter(channel => channel.type === 'Facebook' || channel.type === 'Twitter')} />}
            {<Comms type='email' items={official.emails} />}
            {<Comms type='phone' items={official.phones} />}
        </ul>
    </div>
)

const SUBJECT = 'Support intimate partner violence survivors’ financial security'
const BODY = 'Dear [Legislator], %0D%0A%0D%0AAs a constituent in your district, I am writing to share with you FreeFrom’s National Survivor Financial Security Policy Map and Scorecard (link). [State] can do more to support intimate partner violence survivors’ financial security and long-term safety. I urge you to introduce and pass legislation that are survivor financial security centered such as; %0D%0A%0D%0A-	Expanding the definition of intimate partner violence to include economic abuse %0D%0A-	Protections and relief from coerced and fraudulent debt  %0D%0A-	Protections and relief from litigation abuse %0D%0A-	Improved accessibility to public benefits %0D%0A%0D%0AThank you, %0D%0A[Name]'

const getUrlForType = (type, value) => {
    switch (type) {
    case 'Twitter': return `https://twitter.com/intent/tweet?text=@${value}%20Now%20is%20the%20time%20to%20pass%20survivor-informed%20legislation.%20See%20how%20our%20state%20measures%20up%20in%20supporting%20survivors’%20financial%20security:%20https://mapandscorecard.freefrom.org`
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
                    : faFacebook
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
            : <span></span>
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
