import React from 'react';
import { Formik, Form } from 'formik';
import Head from 'next/head';

import BackButton from "components/navigation/BackButton";
import { site } from "constants/index"
import SharedLayout from "components/SharedLayout";

import Input from "components/forms/Input";
import Select from "components/forms/Select";
import Submit from "components/forms/Submit";

import TakeAction from "components/common/TakeAction";

import { states } from 'constants/forms';
import { aboutYou } from 'constants/forms';

import { checkFormStatus, submitForm } from 'utils'

export default function PolicyIdeas() {

    return (
        <div>
            <Head>
                <title>Share Your Policy Ideas - { site.name }</title>
            </Head>
            <SharedLayout>
                <BackButton className="mt-3 mb-2" />
                <h1 className="subpage-header">Share Your Policy Ideas</h1>
                <p>At FreeFrom, we are constantly iterating and brainstorming new ways that we can support survivors through policy change at the federal, state, and local levels. We encourage you to share any new policy ideas or changes to current policies that would help you, your loved ones, or others in your community that have experienced violence. Thank you for sharing!</p>
                <Formik initialValues={{}} onSubmit={submitForm("policy-ideas")}>
                    {props => {
                        const formStatus = checkFormStatus(props)
                        if (formStatus) return formStatus
                        return (
                            <Form className="col-12 col-lg-8 mb-5">
                                <Input className="text-uppercase" label="What policies and issues should FreeFrom prioritize?" name="policies_to_prioritize" required={ true } />
                                <Input className="text-uppercase" label="What policies and issues are important to you but are not included on the map?" name="policies_not_included" required={ true } />
                                <Select className="text-uppercase" label="Your state" name="state" required={ true } options={ states }/>
                                <Input className="text-uppercase" label="Your name (optional)" name="name" />
                                <Input className="text-uppercase" label="Your pronouns (optional)" name="pronouns" />
                                <Input className="text-uppercase" label="Your email (optional)" name="email" type="email" />
                                <Select className="text-uppercase" label="We’re eager to learn where new policy ideas and changes come from. If you’re comfortable, please tell us more about you." name="about_you" options={ aboutYou }/>
                                {props.values.about_you && props.values.about_you.indexOf("other") !== -1 &&
                              <Input className="text-uppercase" label="Please describe..." name="about_you_other" required={ true } />
                                }
                                <Submit />
                            </Form>
                        )
                    }}
                </Formik>
                <TakeAction />
            </SharedLayout>
        </div>
    )
}
