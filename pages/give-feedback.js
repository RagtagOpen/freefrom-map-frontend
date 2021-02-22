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

import { toolUseful } from 'constants/forms';
import { learnFromTool } from 'constants/forms';

export default function GiveFeedback() {

    return (
        <div>
            <Head>
                <title>Give Feedback - { site.name }</title>
            </Head>
            <SharedLayout>
                <BackButton className="mt-3 mb-2" />
                <h1>Give Feedback</h1>
                <p>The Policy Map and Scorecard will only be effective if it is useful to our users. We want to hear from you how you used the tool and whether it was helpful. If you didn’t find the tool helpful, feel free to share how we can make the necessary improvements. Thanks so much for sharing your feedback and for helping us make the Policy Map and Scorecard the best tool it can possibly be!</p>
                <form className="col-12 col-lg-8 mb-5">
                    <Select label="Was this tool useful?" name="tool-useful" required={ true } options={ toolUseful }/>
                    <Input label="Can you tell us more about how the tool was or was not useful for you?" required={ true } />
                    <Select label="Did you learn anything about policies related to survivor wealth from the tool?" name="learn-from-tool" required={ true } options={ learnFromTool }/>
                    <div className="form-group">
                        <FormLabel required={ true }>How do you plan to use this tool?</FormLabel>
                        <Checkbox name="inform-org-priorities">Inform my organization’s or state coalition’s policy priorities</Checkbox>
                        <Checkbox name="inform-state-priorities">Inform my state’s policy priorities</Checkbox>
                        <Checkbox name="inform-officials">Inform elected officials in my state</Checkbox>
                        <Checkbox name="advocacy-tool">As an advocacy tool</Checkbox>
                        <Checkbox name="self-educating">Self-educating</Checkbox>
                        <Checkbox name="other">Other</Checkbox>
                    </div>
                    <Input label="What can be improved or changed?" required={ true } />
                    <Submit />
                </form>

                <TakeAction />
            </SharedLayout>
        </div>
    )
}
