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

import { identifyAsSurvivor } from 'constants/forms';
import { states } from 'constants/forms';
import { aboutYou } from 'constants/forms';

import { checkFormStatus, submitForm } from 'utils'

export default function PolicyIdeas() {

    return (
        <SharedLayout title="Share Your Policy Ideas">
            <BackButton className="mt-3 mb-2" />
            <h1 className="subpage-header">Share Your Policy Ideas</h1>
            <p>At FreeFrom, we are constantly iterating and brainstorming new ways that we can support survivors through policy change at the federal, state, and local levels. We encourage you to share any new policy ideas or changes to current policies that would help you, your loved ones, or others in your community that have been subjected to violence. Thank you for sharing!</p>
            <Formik initialValues={{}} onSubmit={submitForm("policy-ideas")}>
                {props => {
                    const formStatus = checkFormStatus(props)
                    if (formStatus) return formStatus
                    return (
                        <Form className="col-12 col-lg-8 mb-5">
                            <Input className="text-uppercase" label="What policies and issues should FreeFrom prioritize?" name="policies_to_prioritize" required={ true } />
                            <Input className="text-uppercase" label="What policies and issues are important to you but are not included on the policy map and scorecard?" name="policies_not_included" required={ true } />
                            <Select className="text-uppercase" label="Your state" name="state" required={ true } options={ states }/>
                            <Input className="text-uppercase" label="Your name (optional)" name="name" />
                            <Input className="text-uppercase" label="Your pronouns (optional)" name="pronouns" />
                            <Input className="text-uppercase" label="Your email (optional)" name="email" type="email" />
                            <Select className="text-uppercase" label="Do you identify as a survivor? (optional)" name="survivor" required={ false } options={ identifyAsSurvivor }/>
                            <div className="form-group pb-4 mb-3">
                                <div className="text-uppercase"><FormLabel required={ false }>What is your gender? (Select all that apply to you) (optional)</FormLabel></div>
                                <Checkbox name="gender" value="transgender">Transgender</Checkbox>
                                <Checkbox name="gender" value="genderqueer_gender_fluid">Genderqueer / gender fluid</Checkbox>
                                <Checkbox name="gender" value="gender_nonconforming_nonbinary">Gender non-conforming / non-binary</Checkbox>
                                <Checkbox name="gender" value="intersex">Intersex</Checkbox>
                                <Checkbox name="gender" value="agender">Agender</Checkbox>
                                <Checkbox name="gender" value="two_spirit">Two-spirit</Checkbox>
                                <Checkbox name="gender" value="cisgender">Cisgender</Checkbox>
                                <Checkbox name="gender" value="woman_femme">Woman / femme</Checkbox>
                                <Checkbox name="gender" value="man_masculine">Man / masculine</Checkbox>
                                <Checkbox name="gender" value="prefer_not_to_say_gender">I prefer not to say</Checkbox>
                                <Checkbox name="gender" value="prefer_to_self_describe_gender">I prefer to self-describe</Checkbox>
                            </div>
                            {props.values.gender && props.values.gender.indexOf("prefer_to_self_describe_gender") !== -1 &&
                            <Input className="text-uppercase" label="Please describe..." name="gender_other" required={ false } />
                            }
                            <div className="form-group pb-4 mb-3">
                                <div className="text-uppercase"><FormLabel required={ false }>What is your sexuality? (Select all that apply to you) (optional)</FormLabel></div>
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
                                <div className="text-uppercase"><FormLabel required={ false }>What is your race or ethnicity? (Select all that apply to you) (optional)</FormLabel></div>
                                <Checkbox name="race_or_ethnicity" value="indigenous_american_indian_native_american_or_alaska_native">Indigenous or American Indian or Native American or Alaska Native</Checkbox>
                                <Checkbox name="race_or_ethnicity" value="asian_or_asian_american">Asian or Asian American</Checkbox>
                                <Checkbox name="race_or_ethnicity" value="black_or_african_american_or_haitian_or_other_african_black">Black or African American or Haitian or other African/Black</Checkbox>
                                <Checkbox name="race_or_ethnicity" value="hispanic_or_latinx">Hispanic or Latinx</Checkbox>
                                <Checkbox name="race_or_ethnicity" value="middle_eastern_or_north_african">Middle Eastern or North African</Checkbox>
                                <Checkbox name="race_or_ethnicity" value="mixed_race_or_ethnicity">Mixed race or ethnicity</Checkbox>
                                <Checkbox name="race_or_ethnicity" value="native_hawaiian_or_other_pacific_islander">Native Hawaiian or other Pacific Islander</Checkbox>
                                <Checkbox name="race_or_ethnicity" value="white">White</Checkbox>
                                <Checkbox name="race_or_ethnicity" value="prefer_not_to_say_race">I prefer not to say</Checkbox>
                            </div>
                            <Input className="text-uppercase" label="We'd also like to give you the opportunity to tell us your specific race or ethnicity in an open-ended format. Please feel free to list multiple groups. (For example: Korean, Mexican American, Italian, Navajo Nation, Southerner (American), Puerto Rican, etc.)." name="race_or_ethnicity_other" required={ false } />
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
    )
}
