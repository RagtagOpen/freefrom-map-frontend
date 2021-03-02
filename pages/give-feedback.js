import React from 'react';
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

import { submitForm } from '../util'

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
                <Formik
                    initialValues={{}}
                    onSubmit={submitForm("give-feedback")}
                >
                    {props => (
                        <Form className="col-12 col-lg-8 mb-5">
                            <Select label="Was this tool useful?" name="tool_useful" required={ true } options={ toolUseful }/>
                            <Input label="Can you tell us more about how the tool was or was not useful for you?" name="tool_useful_details" required={ true } />
                            <Select label="Did you learn anything about policies related to survivor wealth from the tool?" name="learn_from_tool" required={ true } options={ learnFromTool }/>
                            <div className="form-group">
                                <FormLabel required={ true }>How do you plan to use this tool?</FormLabel>
                                <Checkbox name="planned_use" value="inform_org_priorities">Inform my organization’s or state coalition’s policy priorities</Checkbox>
                                <Checkbox name="planned_use" value="inform_state_priorities">Inform my state’s policy priorities</Checkbox>
                                <Checkbox name="planned_use" value="inform_officials">Inform elected officials in my state</Checkbox>
                                <Checkbox name="planned_use" value="advocacy_tool">As an advocacy tool</Checkbox>
                                <Checkbox name="planned_use" value="self_educating">Self-educating</Checkbox>
                                <Checkbox name="planned_use" value="other">Other</Checkbox>
                            </div>
                            {props.values.planned_use && props.values.planned_use.indexOf("other") !== -1 &&
                              <Input label="Please describe..." name="planned_use_other" required={ true } />
                            }
                            <Input label="What can be improved or changed?" name="improve_or_change" required={ true } />
                            <Submit />
                        </Form>
                    )}
                </Formik>
                <TakeAction />
            </SharedLayout>
        </div>
    )
}
