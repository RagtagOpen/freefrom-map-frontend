import React from 'react';
import Head from 'next/head';

import BackButton from "components/navigation/BackButton";
import { site } from "constants/index"
import SharedLayout from "components/SharedLayout";

import Form from "components/forms/Form";
import Input from "components/forms/Input";
import Select from "components/forms/Select";
import Checkbox from "components/forms/Checkbox";
import FormLabel from "components/forms/FormLabel";
import Submit from "components/forms/Submit";

import TakeAction from "components/common/TakeAction";

import { states } from 'constants/forms';
import { aboutYou } from 'constants/forms';

export default function PolicyIdeas() {

    return (
        <div>
            <Head>
                <title>Share Your Policy Ideas - { site.name }</title>
            </Head>
            <SharedLayout>
                <BackButton className="mt-3 mb-2" />
                <h1>Share Your Policy Ideas</h1>
                <p>At FreeFrom, we are constantly iterating and brainstorming new ways that we can support survivors through policy change at the federal, state, and local levels. We encourage you to share any new policy ideas or changes to current policies that would help you, your loved ones, or others in your community that have experienced violence. Thank you for sharing!</p>
                <Form className="col-12 col-lg-8 mb-5" path="policy_ideas">
                    <Input label="What policies and issues should FreeFrom prioritize?" name="policies-to-prioritize" required={ true } />
                    <Input label="What policies and issues are important to you but are not included on the map?" name="policies-not-included" required={ true } />
                    <Select label="Your state" name="state" required={ true } options={ states }/>
                    <Input label="Your name (optional)" name="name" />
                    <Input label="Your pronouns (optional)" name="pronouns" />
                    <Input label="Your email (optional)" name="email" type="email" />
                    <Select label="We’re eager to learn where new policy ideas and changes come from. If you’re comfortable, please tell us more about you." name="about-you" options={ aboutYou }/>
                    <Submit />
                </Form>

                <TakeAction />
            </SharedLayout>
        </div>
    )
}
