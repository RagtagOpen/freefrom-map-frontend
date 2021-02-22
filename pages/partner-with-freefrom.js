import React from 'react';
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

import { states } from 'constants/forms';

export default function PartnerWithFreefrom() {

    return (
        <div>
            <Head>
                <title>Partner with FreeFrom - { site.name }</title>
            </Head>
            <SharedLayout>
                <BackButton className="mt-3 mb-2" />
                <h1>Partner with FreeFrom</h1>
                <p>Is your organization interested in partnering with FreeFrom? Please fill out the following information and we will get back to you as soon as possible.</p>
                <form className="col-12 col-lg-8 mb-5">
                    <Input label="Your name" name="name" required={ true } />
                    <Input label="Your email" name="email" required={ true } type="email" />
                    <Input label="Your pronouns" name="pronouns" required={ true } />
                    <Input label="Your organization" name="organization" required={ true } />
                    <Input label="Your title" name="title" required={ true } />
                    <Select label="Your state" name="state" required={ true } options={ states }/>
                    <div className="form-group">
                        <FormLabel required={ true }>How would you like to partner with FreeFrom?</FormLabel>
                        <Checkbox name="policy-innovation-sprint">Request a policy innovation sprint</Checkbox>
                        <Checkbox name="help-drafting-legislation">Help with drafting legislation</Checkbox>
                        <Checkbox name="plan-event-or-webinar">Plan a policy related event or webinar</Checkbox>
                        <Checkbox name="pass-survivor-wealth-centered-legislation">Pass survivor wealth centered legislation in my state</Checkbox>
                    </div>
                    <div className="form-group">
                        <FormLabel>What phase of the process are you in?</FormLabel>
                        <Checkbox name="need-guidance">I need guidance on centering my organization’s policy priorities to be more survivor-wealth informed</Checkbox>
                        <Checkbox name="have-an-idea">I have a policy idea but need help with getting started</Checkbox>
                        <Checkbox name="developed-a-coalition">I’ve developed a coalition or a network to support my policy idea</Checkbox>
                        <Checkbox name="spoke-with-state">I’ve spoken with my state representative about my policy idea</Checkbox>
                        <Checkbox name="ready-to-introduce">My state representative is ready to introduce my policy idea into a bill</Checkbox>
                        <Checkbox name="finish-line">I need help getting a bill to the finish line</Checkbox>
                    </div>
                    <Submit />
                </form>

                <TakeAction />
            </SharedLayout>
        </div>
    )
}
