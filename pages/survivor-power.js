import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'

import BackButton from 'components/navigation/BackButton'
import SharedLayout from 'components/SharedLayout'

import Input from 'components/forms/Input'
import Select from 'components/forms/Select'
import Checkbox from 'components/forms/Checkbox'
import FormLabel from 'components/forms/FormLabel'
import Submit from 'components/forms/Submit'

import TakeAction from 'components/common/TakeAction'

import { identifyAsSurvivor } from 'constants/forms'
import { states } from 'constants/forms'

import { checkFormStatus, submitForm } from 'utils'

export default function BuildCollectiveSurvivorPower() {
    return (
        <SharedLayout title='Build Collective Survivor Power'>
            <BackButton className='mt-3 mb-2' />
            <h1 className='subpage-header'>Build Collective Survivor Power</h1>
            <p>
                Survivors are often left out of the policy-making process, even when the policies being considered will
                directly impact our lives. At FreeFrom, we want to change that! We are working to create spaces and
                materials to support survivors who want to play an active role in creating and advocating for policies
                in their state that will improve their lives and the lives of their families.
            </p>
            <p>
                Are you a survivor interested in being more involved in policy advocacy in your state? If so, please
                take a few moments to fill out this information and we will get back to you as soon as possible.
            </p>
            <Formik initialValues={{}} onSubmit={submitForm('survivor-power')}>
                {(props) => {
                    const formStatus = checkFormStatus(props)
                    if (formStatus) return formStatus
                    return (
                        <Form className='col-12 col-lg-8 mb-5'>
                            <Input className='text-uppercase' label='Your name' name='name' required={true} />
                            <Input
                                className='text-uppercase'
                                label='Your pronouns (optional)'
                                name='pronouns'
                                required={false}
                            />
                            <Select
                                className='text-uppercase'
                                label='Do you identify as a survivor? (optional)'
                                name='survivor'
                                required={false}
                                options={identifyAsSurvivor}
                            />
                            <div className='form-group pb-4 mb-3'>
                                <div className='text-uppercase'>
                                    <FormLabel required={false}>
                                        What is your gender? (select all that apply to you) (optional)
                                    </FormLabel>
                                </div>
                                <Checkbox name='gender' value='transgender'>
                                    Transgender
                                </Checkbox>
                                <Checkbox name='gender' value='genderqueer_gender_fluid'>
                                    Genderqueer / gender fluid
                                </Checkbox>
                                <Checkbox name='gender' value='gender_nonconforming_nonbinary'>
                                    Gender non-conforming / non-binary
                                </Checkbox>
                                <Checkbox name='gender' value='intersex'>
                                    Intersex
                                </Checkbox>
                                <Checkbox name='gender' value='agender'>
                                    Agender
                                </Checkbox>
                                <Checkbox name='gender' value='two_spirit'>
                                    Two-spirit
                                </Checkbox>
                                <Checkbox name='gender' value='cisgender'>
                                    Cisgender
                                </Checkbox>
                                <Checkbox name='gender' value='woman_femme'>
                                    Woman / femme
                                </Checkbox>
                                <Checkbox name='gender' value='man_masculine'>
                                    Man / masculine
                                </Checkbox>
                                <Checkbox name='gender' value='prefer_not_to_say_gender'>
                                    I prefer not to say
                                </Checkbox>
                                <Checkbox name='gender' value='prefer_to_self_describe_gender'>
                                    I prefer to self-describe
                                </Checkbox>
                            </div>
                            {props.values.gender &&
                                props.values.gender.indexOf('prefer_to_self_describe_gender') !== -1 && (
                                <Input
                                    className='text-uppercase'
                                    label='Please describe...'
                                    name='gender_other'
                                    required={false}
                                />
                            )}
                            <div className='form-group pb-4 mb-3'>
                                <div className='text-uppercase'>
                                    <FormLabel required={false}>
                                        What is your sexuality? (select all that apply to you) (optional)
                                    </FormLabel>
                                </div>
                                <Checkbox name='sexuality' value='queer'>
                                    Queer
                                </Checkbox>
                                <Checkbox name='sexuality' value='asexual_aromantic'>
                                    Asexual / aromantic
                                </Checkbox>
                                <Checkbox name='sexuality' value='bisexual'>
                                    Bisexual
                                </Checkbox>
                                <Checkbox name='sexuality' value='pansexual'>
                                    Pansexual
                                </Checkbox>
                                <Checkbox name='sexuality' value='lesbian'>
                                    Lesbian
                                </Checkbox>
                                <Checkbox name='sexuality' value='gay'>
                                    Gay
                                </Checkbox>
                                <Checkbox name='sexuality' value='heterosexual_straight'>
                                    Heterosexual / straight
                                </Checkbox>
                                <Checkbox name='sexuality' value='prefer_not_to_say_sexuality'>
                                    I prefer not to say
                                </Checkbox>
                                <Checkbox name='sexuality' value='prefer_to_self_describe_sexuality'>
                                    I prefer to self-describe
                                </Checkbox>
                            </div>
                            {props.values.sexuality &&
                                props.values.sexuality.indexOf('prefer_to_self_describe_sexuality') !== -1 && (
                                <Input
                                    className='text-uppercase'
                                    label='Please describe...'
                                    name='sexuality_other'
                                    required={false}
                                />
                            )}
                            <div className='form-group pb-4 mb-3'>
                                <div className='text-uppercase'>
                                    <FormLabel required={false}>
                                        What is your race or ethnicity? (select all that apply to you) (optional)
                                    </FormLabel>
                                </div>
                                <Checkbox
                                    name='race_or_ethnicity'
                                    value='indigenous_american_indian_native_american_or_alaska_native'
                                >
                                    Indigenous or American Indian or Native American or Alaska Native
                                </Checkbox>
                                <Checkbox name='race_or_ethnicity' value='asian_or_asian_american'>
                                    Asian or Asian American
                                </Checkbox>
                                <Checkbox
                                    name='race_or_ethnicity'
                                    value='black_or_african_american_or_haitian_or_other_african_black'
                                >
                                    Black or African American or Haitian or other African/Black
                                </Checkbox>
                                <Checkbox name='race_or_ethnicity' value='hispanic_or_latinx'>
                                    Hispanic or Latinx
                                </Checkbox>
                                <Checkbox name='race_or_ethnicity' value='middle_eastern_or_north_african'>
                                    Middle Eastern or North African
                                </Checkbox>
                                <Checkbox name='race_or_ethnicity' value='mixed_race_or_ethnicity'>
                                    Mixed race or ethnicity
                                </Checkbox>
                                <Checkbox name='race_or_ethnicity' value='native_hawaiian_or_other_pacific_islander'>
                                    Native Hawaiian or other Pacific Islander
                                </Checkbox>
                                <Checkbox name='race_or_ethnicity' value='white'>
                                    White
                                </Checkbox>
                                <Checkbox name='race_or_ethnicity' value='prefer_not_to_say_race'>
                                    I prefer not to say
                                </Checkbox>
                            </div>
                            <Input
                                className='text-uppercase'
                                label={"We'd also like to give you the opportunity to tell us your specific \
                                        race or ethnicity in an open-ended format. Please feel free to list multiple \
                                        groups. (For example: Korean, Mexican American, Italian, Navajo Nation, \
                                        Southerner (American), Puerto Rican, etc.)."}
                                name='race_or_ethnicity_other'
                                required={false}
                            />
                            <Select
                                className='text-uppercase'
                                label='Your state (optional)'
                                name='state'
                                required={false}
                                options={states}
                            />
                            <div className='form-group pb-4 mb-3'>
                                <div className='text-uppercase'>
                                    <FormLabel required={true}>The safest way to contact you is...</FormLabel>
                                </div>
                                <Checkbox name='contact_method' value='text'>
                                    Text
                                </Checkbox>
                                <Checkbox name='contact_method' value='call'>
                                    Phone call
                                </Checkbox>
                                <Checkbox name='contact_method' value='email'>
                                    Email
                                </Checkbox>
                                <Checkbox name='contact_method' value='none'>
                                    There is not a safe way to contact me; I will contact you
                                </Checkbox>
                            </div>
                            {props.values.contact_method &&
                                (props.values.contact_method.indexOf('call') !== -1 ||
                                    props.values.contact_method.indexOf('text') !== -1) && (
                                <Input
                                    className='text-uppercase'
                                    label='Your phone number'
                                    name='phone'
                                    type='phone'
                                    required={true}
                                />
                            )}
                            {props.values.contact_method && props.values.contact_method.indexOf('email') !== -1 && (
                                <Input
                                    className='text-uppercase'
                                    label='Your email'
                                    name='email'
                                    type='email'
                                    required={true}
                                />
                            )}
                            {props.values.contact_method && props.values.contact_method.indexOf('none') !== -1 && (
                                <p className='pb-4 mb-3'>
                                    <em>
                                        To contact FreeFrom, please email us at{' '}
                                        <a href='mailto:info@freefrom.org'>info@freefrom.org</a>.
                                    </em>
                                </p>
                            )}
                            <div className='form-group pb-4 mb-3'>
                                <div className='text-uppercase'>
                                    <FormLabel required={true}>
                                        Which of the following are you interested in?
                                        (Select as many as you&apos;d like.)
                                    </FormLabel>
                                </div>
                                <Checkbox name='interest_area' value='be_policy_advocate'>
                                    Learning how to be a policy advocate in my state
                                </Checkbox>
                                <Checkbox name='interest_area' value='connect_with_survivors'>
                                    Connecting with other survivors in my state
                                </Checkbox>
                                <Checkbox name='interest_area' value='advocacy_coalition'>
                                    Joining or starting a survivor-led policy advocacy coalition in my state
                                </Checkbox>
                                <Checkbox name='interest_area' value='p2p_financial_support_group'>
                                    Learning more about Peer to Peer Financial Support Group
                                </Checkbox>
                                <Checkbox name='interest_area' value='other'>
                                    Other
                                </Checkbox>
                            </div>
                            {props.values.interest_area && props.values.interest_area.indexOf('other') !== -1 && (
                                <Input
                                    className='text-uppercase'
                                    label='Please describe...'
                                    name='interest_area_other'
                                    required={true}
                                />
                            )}
                            <Submit />
                        </Form>
                    )
                }}
            </Formik>
            <TakeAction />
        </SharedLayout>
    )
}

BuildCollectiveSurvivorPower.propTypes = {
    values: PropTypes.shape({
        gender: PropTypes.string,
        sexuality: PropTypes.string,
        contact_method: PropTypes.string,
        interest_area: PropTypes.string,
    })
}
