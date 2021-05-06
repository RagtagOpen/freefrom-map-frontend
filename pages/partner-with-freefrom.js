import React from 'react';
import { Formik, Form } from 'formik';

import BackButton from "components/navigation/BackButton";
import SharedLayout from "components/SharedLayout";

import Input from "components/forms/Input";
import Select from "components/forms/Select";
import Checkbox from "components/forms/Checkbox";
import FormLabel from "components/forms/FormLabel";
import Submit from "components/forms/Submit";

import TakeAction from "components/common/TakeAction";

import { states } from 'constants/forms';

import { checkFormStatus, submitForm } from 'utils'

export default function PartnerWithFreefrom() {
    return (
        <SharedLayout title="Partner with FreeFrom">
            <BackButton className="mt-3 mb-2" />
            <h1 className="subpage-header">Partner with FreeFrom</h1>
            <p>Is your organization interested in partnering with FreeFrom? Please fill out the following information and we will get back to you as soon as possible.</p>
            <Formik initialValues={{}} onSubmit={submitForm("partner-with-freefrom")}>
                {props => {
                    const formStatus = checkFormStatus(props)
                    if (formStatus) return formStatus
                    return (
                        <Form className="col-12 col-lg-8 mb-5">
                            <Input className="text-uppercase" label="Your name" name="name" required={ true } />
                            <Input className="text-uppercase" label="Your email" name="email" required={ true } type="email" />
                            <Input className="text-uppercase" label="Your pronouns" name="pronouns" required={ true } />
                            <Input className="text-uppercase" label="Your organization" name="organization" required={ true } />
                            <Input className="text-uppercase" label="Your title" name="title" required={ true } />
                            <Select className="text-uppercase" label="Your state" name="state" required={ true } options={ states }/>
                            <div className="form-group pb-4 mb-3">
                                <div className="text-uppercase"><FormLabel required={ false }>What is your gender? (select all that apply to you) (optional)</FormLabel></div>
                                <Checkbox name="gender" value="transgender">Transgender</Checkbox>
                                <Checkbox name="gender" value="genderqueer_gender_fluid">Genderqueer / gender fluid</Checkbox>
                                <Checkbox name="gender" value="gender_nonconforming_nonbinary">Gender non-conforming / non-binary</Checkbox>
                                <Checkbox name="gender" value="intersex">Intersex</Checkbox>
                                <Checkbox name="gender" value="agender">Agender</Checkbox>
                                <Checkbox name="gender" value="two_spirit">Two-spirit</Checkbox>
                                <Checkbox name="gender" value="cisgender">Cisgender</Checkbox>
                                <Checkbox name="gender" value="female_femme">Female / femme</Checkbox>
                                <Checkbox name="gender" value="male_masculine">Male / masculine</Checkbox>
                                <Checkbox name="gender" value="prefer_not_to_say_gender">I prefer not to say</Checkbox>
                                <Checkbox name="gender" value="prefer_to_self_describe_gender">I prefer to self-describe</Checkbox>
                            </div>
                            {props.values.gender && props.values.gender.indexOf("prefer_to_self_describe_gender") !== -1 &&
                            <Input className="text-uppercase" label="Please describe..." name="gender_other" required={ false } />
                            }
                            <div className="form-group pb-4 mb-3">
                                <div className="text-uppercase"><FormLabel required={ false }>What is your sexuality? (select all that apply to you) (optional)</FormLabel></div>
                                <Checkbox name="sexuality" value="queer">Queer</Checkbox>
                                <Checkbox name="sexuality" value="asexual_aromantic">Asexual / aromantic</Checkbox>
                                <Checkbox name="sexuality" value="bisexual">Bisexual</Checkbox>
                                <Checkbox name="sexuality" value="pansexual">Pansexual</Checkbox>
                                <Checkbox name="sexuality" value="lesbian">Lesbian</Checkbox>
                                <Checkbox name="sexuality" value="gay">Gay</Checkbox>
                                <Checkbox name="sexuality" value="heterosexual_straight">Heterosexual / straight</Checkbox>
                                <Checkbox name="sexuality" value="prefer_not_to_say_sexuality">I prefer not to say</Checkbox>
                                <Checkbox name="sexuality" value="prefer_to_self_describe_sexuality">I prefer to self-describe</Checkbox>
                            </div>
                            {props.values.sexuality && props.values.sexuality.indexOf("prefer_to_self_describe_sexuality") !== -1 &&
                            <Input className="text-uppercase" label="Please describe..." name="sexuality_other" required={ false } />
                            }
                            <div className="form-group pb-4 mb-3">
                                <div className="text-uppercase"><FormLabel required={ false }>What is your race or ethnicity? (select all that apply to you) (optional)</FormLabel></div>
                                <Checkbox name="race_or_ethnicity" value="american_indian_or_alaska_native">American Indian or Alaska Native</Checkbox>
                                <Checkbox name="race_or_ethnicity" value="asian_or_asian_american">Asian or Asian American</Checkbox>
                                <Checkbox name="race_or_ethnicity" value="black_or_african_american">Black or African American</Checkbox>
                                <Checkbox name="race_or_ethnicity" value="hispanic_or_latinx">Hispanic or Latinx</Checkbox>
                                <Checkbox name="race_or_ethnicity" value="middle_eastern_or_north_african">Middle Eastern or North African</Checkbox>
                                <Checkbox name="race_or_ethnicity" value="mixed_race_or_ethnicity">Mixed race or ethnicity</Checkbox>
                                <Checkbox name="race_or_ethnicity" value="native_hawaiian_or_other_pacific_islander">Native Hawaiian or other Pacific Islander</Checkbox>
                                <Checkbox name="race_or_ethnicity" value="white">White</Checkbox>
                                <Checkbox name="race_or_ethnicity" value="prefer_not_to_say_race">I prefer not to say</Checkbox>
                            </div>
                            <Input className="text-uppercase" label="While we are required to report the above race and ethnicity categories, we understand these classifications have been used to subjugate, otherize, and/or exclude certain people. So, we'd like to give you the opportunity to tell us your specific race or ethnicity, free of boxes. Please feel free to list multiple groups. (For example: Korean, Mexican American, Italian, Navajo Nation, Southerner (American), Puerto Rican, etc.)" name="race_or_ethnicity_other" required={ false } />
                            <div className="form-group pb-4 mb-3">
                                <div className="text-uppercase"><FormLabel required={ true }>How would you like to partner with FreeFrom?</FormLabel></div>
                                <Checkbox name="goals" value="policy_innovation_sprint">Request a policy innovation sprint</Checkbox>
                                <Checkbox name="goals" value="help_drafting_legislation">Help with drafting legislation</Checkbox>
                                <Checkbox name="goals" value="plan_event_or_webinar">Plan a policy related event or webinar</Checkbox>
                                <Checkbox name="goals" value="pass_survivor_wealth_centered_legislation">Pass survivor wealth centered legislation in my state</Checkbox>
                            </div>
                            {props.values.goals && props.values.goals.indexOf("pass_survivor_wealth_centered_legislation") !== -1 &&
                            <div className="form-group pb-4 mb-3">
                                <div className="text-uppercase"><FormLabel required={ true }>What phase of the process are you in?</FormLabel></div>
                                <Checkbox name="process_phase" value="need_guidance">I need guidance on centering my organization’s policy priorities to be more survivor-wealth informed</Checkbox>
                                <Checkbox name="process_phase" value="have_an_idea">I have a policy idea but need help with getting started</Checkbox>
                                <Checkbox name="process_phase" value="developed_a_coalition">I’ve developed a coalition or a network to support my policy idea</Checkbox>
                                <Checkbox name="process_phase" value="spoke_with_state">I’ve spoken with my state representative about my policy idea</Checkbox>
                                <Checkbox name="process_phase" value="ready_to_introduce">My state representative is ready to introduce my policy idea into a bill</Checkbox>
                                <Checkbox name="process_phase" value="finish_line">I need help getting a bill to the finish line</Checkbox>
                            </div>
                            }
                            <Submit />
                        </Form>
                    )
                }}
            </Formik>
            <TakeAction />
        </SharedLayout>
    )
}
