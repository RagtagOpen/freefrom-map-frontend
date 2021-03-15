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
    console.log(json)
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
                <h1>Contact Your Legislators</h1>
                <p>The Policy Map and Scorecard will only be effective if it is useful to our users. We want to hear from you how you used the tool and whether it was helpful. If you didn’t find the tool helpful, feel free to share how we can make the necessary improvements. Thanks so much for sharing your feedback and for helping us make the Policy Map and Scorecard the best tool it can possibly be!</p>
                <Formik
                    initialValues={{}}
                    onSubmit={submitZipCode}
                >
                    {props => (
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
                    )}
                </Formik>
                <div className='mb-5 pl-3' >
                    {officials.map(o => <Official key={o.name} official={o} />)}
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
                    <li className='list-inline-item mr-3' key={c.id}>
                        <FontAwesomeIcon icon={ icon } className="mr-1" />{c.type === 'Twitter' && '@'}{c.id}
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
                        <FontAwesomeIcon icon={ icon } className="mr-1" />{item}
                    </li>
                ))
                : <li className='list-inline-item mr-3'>[No {type} found]</li>
            }
        </>
    )
}

export default ContactLegislators
