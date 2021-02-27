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

export default function BuildCollectiveSurvivorPower() {

    return (
        <div>
            <Head>
                <title>Build Collective Survivor Power - { site.name }</title>
            </Head>
            <SharedLayout>
                <BackButton className="mt-3 mb-2" />
                <h1>Build Collective Survivor Power</h1>
                <p>Survivors are often left out of the policy-making process, even when the policies being considered will directly impact our lives. At FreeFrom, we want to change that! We are working to create spaces and materials to support survivors who want to play an active role in creating and advocating for policies in their state that will improve their lives and the lives of their families.</p>
                <p>Are you a survivor interested in being more involved in policy advocacy in your state? If so, please take a few moments to fill out this information and we will get back to you as soon as possible.</p>
                <Form
                    className="col-12 col-lg-8 mb-5"
                    path="survivor-power"
                    form={props => (
                        <form>
                            <Input label="Your name" name="name" required={ true } />
                            <Input label="Your pronouns" name="pronouns" required={ true } />
                            <div className="form-group">
                                <FormLabel required={ true }>Which of the following are you interested in? (Select as many as you'd like.)</FormLabel>
                                <Checkbox name="interest_area" value="be_policy_advocate">Learning how to be a policy advocate in my state</Checkbox>
                                <Checkbox name="interest_area" value="connect_with_survivors">Connecting with other survivors in my state</Checkbox>
                                <Checkbox name="interest_area" value="advocacy_coalition">Joining or starting a survivor-led policy advocacy coalition in my state</Checkbox>
                                <Checkbox name="interest_area" value="p2p_financial_support_group">Learning more about Peer to Peer Financial Support Group</Checkbox>
                                <Checkbox name="interest_area" value="other">Other</Checkbox>
                            </div>
                            {props.values.interest_area && props.values.interest_area.indexOf("other") !== -1 &&
                              <Input label="Please describe..." name="interest_area_other"/>
                            }
                            <div className="form-group">
                                <FormLabel required={ true }>The safest way to contact you is...</FormLabel>
                                <Checkbox name="contact_method" value="text">Text</Checkbox>
                                <Checkbox name="contact_method" value="call">Phone call</Checkbox>
                                <Checkbox name="contact_method" value="email">Email</Checkbox>
                                <Checkbox name="contact_method" value="none">There is not a safe way to contact me, I will contact you</Checkbox>
                            </div>
                            {props.values.contact_method && (props.values.contact_method.indexOf("call") !== -1 || props.values.contact_method.indexOf("text") !== -1) &&
                              <Input label="Your phone number" name="phone" type="phone" />
                            }
                            {props.values.contact_method && props.values.contact_method.indexOf("email") !== -1 &&
                              <Input label="Your email" name="email" type="email" />
                            }
                            {props.values.contact_method && props.values.contact_method.indexOf("none") !== -1 &&
                              <p><em>To contact FreeFrom, please email us at <a href="mailto:info@freefrom.org">info@freefrom.org</a>.</em></p>
                            }
                            <Submit />
                        </form>
                    )}
                />
                <TakeAction />
            </SharedLayout>
        </div>
    )
}
