import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import Head from 'next/head';

import BackButton from "components/navigation/BackButton";
import { site } from "constants/index"
import SharedLayout from "components/SharedLayout";

import Input from "components/forms/Input";
import Select from "components/forms/Select";
import Checkbox from "components/forms/Checkbox";
import FormLabel from "components/forms/FormLabel";
import Submit from "components/forms/Submit";

import TakeAction from "components/common/TakeAction";

import { toolUseful } from 'constants/forms';
import { learnFromTool } from 'constants/forms';

import { submitForm } from 'utils'

/**
 * This method uses the Google Civic Info API to get representatives for a zip
 * code. API documentation is here:
 * https://developers.google.com/civic-information/docs/v2/representatives/representativeInfoByAddress
 */
async function getRepresentativesByZip (zip) {
  const res = await fetch(`https://content-civicinfo.googleapis.com/civicinfo/v2/representatives?address=${zip}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`)
  const {officials} = await res.json()
  console.log(officials)
  return officials
}

function ContactLegislators() {
    const [officials, setOfficials] = useState([])
    const submitZipCode = async values => {
      const officials = await getRepresentativesByZip(values.zip_code)
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
                        <Form className="col-12 col-lg-8 mb-5">
                            <Input label="Enter your zip code to find your legislators:" name="zip_code" required={ true } />
                            <Submit />
                        </Form>
                    )}
                </Formik>
                {officials.map(o => <Official key={o.name} official={o} />)}
                <TakeAction />
            </SharedLayout>
        </div>
    )
}

const Official = ({official}) => (
  <div>
    <h2>{official.name}</h2>
    <ul>
      {<Channels channels={official.channels || []} />}
      {<Comms email items={official.emails || []} />}
      {<Comms phone items={official.phones || []} />}
    </ul>
  </div>
)

const Channels = ({channels}) => (
  <>
    {channels.map(c => (
      <li key={c.id}>{c.type}: {c.id}</li>
    ))}
  </>
)

const Comms = ({email, items, phone}) => (
  <>
    {items.map(item => (
      <li key={item}>{email && 'email: '}{phone && 'phone: '}{item}</li>
    ))}
  </>
)

export default ContactLegislators
