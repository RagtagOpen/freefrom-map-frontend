import React, { useState } from 'react'

import Modal from 'components/modal/Modal'
import Submit from 'components/forms/Submit'
import { trackEvent } from 'utils'

const StateUpdates = () => {
    const [submitted, setSubmitted] = useState(false)
    return (
        <Modal target='state-updates' text='Sign up for state updates' title='Sign up for state updates'>
            {submitted && (
                <div className='alert alert-success' role='alert'>
                    <h4 className='alert-heading'>Thanks for signing up for state updates!</h4>
                    <p>Be sure to finish the subscription process on the Mailchimp page.</p>
                    <hr />
                    <button className='btn btn-link alert-link' onClick={() => setSubmitted(false)}>
                        Submit another response
                    </button>
                </div>
            )}
            <div
                // Note: the form component must be rendered to the DOM
                // (which is why this uses display:none to hide the form),
                // otherwise the "Form submission canceled because the form
                // is not connected" error will prevent form submission.

                // eslint-disable-next-line max-len
                // See: https://stackoverflow.com/questions/42053775/getting-error-form-submission-canceled-because-the-form-is-not-connected#comment92670322_47848508
                style={{ display: submitted ? 'none' : undefined }}
            >
                <p className='small'>
                    We&apos;ll be updating our mapping tool as states pass new policies. Sign up below and we&apos;ll
                    send you an email when the state(s) you select passes a policy that impacts survivors&apos;
                    financial security.
                </p>
                <form
                    // eslint-disable-next-line max-len
                    action='https://freefrom.us11.list-manage.com/subscribe/post?u=709a0a051cd8a5f3df002da88&amp;id=54b262f0fa'
                    className='validate'
                    id='mc-embedded-subscribe-form'
                    method='post'
                    name='mc-embedded-subscribe-form'
                    noValidate
                    onSubmit={() => {
                        setSubmitted(true)
                        trackEvent({ category: 'Form', action: 'Submission', label: 'subscribe-state-updates' })
                    }}
                    target='_blank'
                >
                    <div id='mc_embed_signup_scroll'>
                        <div className='mc-field-group mb-4'>
                            <label
                                htmlFor='mce-SURVIVOR'
                                className='small mb-0 ml-1'
                                style={{ color: '#212529', fontWeight: '600' }}
                            >
                                Do you identify as a survivor? (optional){' '}
                            </label>
                            <br />
                            <select
                                id='mce-SURVIVOR'
                                name='SURVIVOR'
                                className='small'
                                style={{ border: '0', borderBottom: '1px solid #292F36', borderRadius: '0' }}
                            >
                                <option value=''></option>
                                <option value='Yes'>Yes</option>
                                <option value='No'>No</option>
                            </select>
                        </div>
                        <div className='mc-field-group mb-4'>
                            <label
                                htmlFor='mce-YOUR_STATE'
                                className='small mb-0 ml-1'
                                style={{ color: '#212529', fontWeight: '600' }}
                            >
                                Your state (optional)
                            </label>
                            <br />
                            <select
                                id='mce-YOUR_STATE'
                                name='YOUR_STATE'
                                className='small'
                                style={{ border: '0', borderBottom: '1px solid #292F36', borderRadius: '0' }}
                            >
                                <option value=''></option>
                                <option value='Alabama'>Alabama</option>
                                <option value='Alaska'>Alaska</option>
                                <option value='Arizona'>Arizona</option>
                                <option value='Arkansas'>Arkansas</option>
                                <option value='California'>California</option>
                                <option value='Colorado'>Colorado</option>
                                <option value='Connecticut'>Connecticut</option>
                                <option value='Delaware'>Delaware</option>
                                <option value='District of Columbia'>District of Columbia</option>
                                <option value='Florida'>Florida</option>
                                <option value='Georgia'>Georgia</option>
                                <option value='Hawaii'>Hawaii</option>
                                <option value='Idaho'>Idaho</option>
                                <option value='Illinois'>Illinois</option>
                                <option value='Indiana'>Indiana</option>
                                <option value='Iowa'>Iowa</option>
                                <option value='Kansas'>Kansas</option>
                                <option value='Kentucky'>Kentucky</option>
                                <option value='Louisiana'>Louisiana</option>
                                <option value='Maine'>Maine</option>
                                <option value='Maryland'>Maryland</option>
                                <option value='Massachusetts'>Massachusetts</option>
                                <option value='Michigan'>Michigan</option>
                                <option value='Minnesota'>Minnesota</option>
                                <option value='Mississippi'>Mississippi</option>
                                <option value='Missouri'>Missouri</option>
                                <option value='Montana'>Montana</option>
                                <option value='Nebraska'>Nebraska</option>
                                <option value='Nevada'>Nevada</option>
                                <option value='New Hampshire'>New Hampshire</option>
                                <option value='New Jersey'>New Jersey</option>
                                <option value='New Mexico'>New Mexico</option>
                                <option value='New York'>New York</option>
                                <option value='North Carolina'>North Carolina</option>
                                <option value='North Dakota'>North Dakota</option>
                                <option value='Ohio'>Ohio</option>
                                <option value='Oklahoma'>Oklahoma</option>
                                <option value='Oregon'>Oregon</option>
                                <option value='Pennsylvania'>Pennsylvania</option>
                                <option value='Rhode Island'>Rhode Island</option>
                                <option value='South Carolina'>South Carolina</option>
                                <option value='South Dakota'>South Dakota</option>
                                <option value='Tennessee'>Tennessee</option>
                                <option value='Texas'>Texas</option>
                                <option value='Utah'>Utah</option>
                                <option value='Vermont'>Vermont</option>
                                <option value='Virginia'>Virginia</option>
                                <option value='Washington'>Washington</option>
                                <option value='West Virginia'>West Virginia</option>
                                <option value='Wisconsin'>Wisconsin</option>
                                <option value='Wyoming'>Wyoming</option>
                            </select>
                        </div>
                        <div className='mc-field-group mb-4'>
                            <p className='mb-1 small' style={{ color: '#212529', fontWeight: '600' }}>
                                Your email <span className='asterisk'>*</span>
                            </p>
                            <input type='email' name='EMAIL' className='required email small' id='mce-EMAIL' />
                        </div>
                        <div className='mc-field-group input-group mb-4'>
                            <p className='mb-1 small' style={{ color: '#212529', fontWeight: '600' }}>
                                Which state(s) would you like to receive updates for?
                                <span className='asterisk'>*</span>
                            </p>
                            <ul className='no-indents no-bullets mb-0'>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='16'
                                        name='group[30989][16]'
                                        id='mce-group[30989]-30989-0'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-0'>
                                        Alabama
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='32'
                                        name='group[30989][32]'
                                        id='mce-group[30989]-30989-1'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-1'>
                                        Alaska
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='64'
                                        name='group[30989][64]'
                                        id='mce-group[30989]-30989-2'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-2'>
                                        Arizona
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='128'
                                        name='group[30989][128]'
                                        id='mce-group[30989]-30989-3'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-3'>
                                        Arkansas
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='256'
                                        name='group[30989][256]'
                                        id='mce-group[30989]-30989-4'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-4'>
                                        California
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='512'
                                        name='group[30989][512]'
                                        id='mce-group[30989]-30989-5'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-5'>
                                        Colorado
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='1024'
                                        name='group[30989][1024]'
                                        id='mce-group[30989]-30989-6'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-6'>
                                        Connecticut
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='2048'
                                        name='group[30989][2048]'
                                        id='mce-group[30989]-30989-7'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-7'>
                                        Delaware
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='4096'
                                        name='group[30989][4096]'
                                        id='mce-group[30989]-30989-8'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-8'>
                                        District of Columbia
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='8192'
                                        name='group[30989][8192]'
                                        id='mce-group[30989]-30989-9'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-9'>
                                        Florida
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='16384'
                                        name='group[30989][16384]'
                                        id='mce-group[30989]-30989-10'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-10'>
                                        Georgia
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='32768'
                                        name='group[30989][32768]'
                                        id='mce-group[30989]-30989-11'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-11'>
                                        Hawaii
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='65536'
                                        name='group[30989][65536]'
                                        id='mce-group[30989]-30989-12'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-12'>
                                        Idaho
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='131072'
                                        name='group[30989][131072]'
                                        id='mce-group[30989]-30989-13'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-13'>
                                        Illinois
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='262144'
                                        name='group[30989][262144]'
                                        id='mce-group[30989]-30989-14'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-14'>
                                        Indiana
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='524288'
                                        name='group[30989][524288]'
                                        id='mce-group[30989]-30989-15'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-15'>
                                        Iowa
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='1048576'
                                        name='group[30989][1048576]'
                                        id='mce-group[30989]-30989-16'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-16'>
                                        Kansas
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='2097152'
                                        name='group[30989][2097152]'
                                        id='mce-group[30989]-30989-17'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-17'>
                                        Kentucky
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='4194304'
                                        name='group[30989][4194304]'
                                        id='mce-group[30989]-30989-18'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-18'>
                                        Louisiana
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='8388608'
                                        name='group[30989][8388608]'
                                        id='mce-group[30989]-30989-19'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-19'>
                                        Maine
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='16777216'
                                        name='group[30989][16777216]'
                                        id='mce-group[30989]-30989-20'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-20'>
                                        Maryland
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='33554432'
                                        name='group[30989][33554432]'
                                        id='mce-group[30989]-30989-21'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-21'>
                                        Massachusetts
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='67108864'
                                        name='group[30989][67108864]'
                                        id='mce-group[30989]-30989-22'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-22'>
                                        Michigan
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='134217728'
                                        name='group[30989][134217728]'
                                        id='mce-group[30989]-30989-23'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-23'>
                                        Minnesota
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='268435456'
                                        name='group[30989][268435456]'
                                        id='mce-group[30989]-30989-24'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-24'>
                                        Mississippi
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='536870912'
                                        name='group[30989][536870912]'
                                        id='mce-group[30989]-30989-25'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-25'>
                                        Missouri
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='1073741824'
                                        name='group[30989][1073741824]'
                                        id='mce-group[30989]-30989-26'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-26'>
                                        Montana
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='2147483648'
                                        name='group[30989][2147483648]'
                                        id='mce-group[30989]-30989-27'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-27'>
                                        Nebraska
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='4294967296'
                                        name='group[30989][4294967296]'
                                        id='mce-group[30989]-30989-28'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-28'>
                                        Nevada
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='8589934592'
                                        name='group[30989][8589934592]'
                                        id='mce-group[30989]-30989-29'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-29'>
                                        New Hampshire
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='17179869184'
                                        name='group[30989][17179869184]'
                                        id='mce-group[30989]-30989-30'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-30'>
                                        New Jersey
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='34359738368'
                                        name='group[30989][34359738368]'
                                        id='mce-group[30989]-30989-31'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-31'>
                                        New Mexico
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='68719476736'
                                        name='group[30989][68719476736]'
                                        id='mce-group[30989]-30989-32'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-32'>
                                        New York
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='137438953472'
                                        name='group[30989][137438953472]'
                                        id='mce-group[30989]-30989-33'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-33'>
                                        North Carolina
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='274877906944'
                                        name='group[30989][274877906944]'
                                        id='mce-group[30989]-30989-34'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-34'>
                                        North Dakota
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='549755813888'
                                        name='group[30989][549755813888]'
                                        id='mce-group[30989]-30989-35'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-35'>
                                        Ohio
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='1099511627776'
                                        name='group[30989][1099511627776]'
                                        id='mce-group[30989]-30989-36'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-36'>
                                        Oklahoma
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='2199023255552'
                                        name='group[30989][2199023255552]'
                                        id='mce-group[30989]-30989-37'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-37'>
                                        Oregon
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='4398046511104'
                                        name='group[30989][4398046511104]'
                                        id='mce-group[30989]-30989-38'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-38'>
                                        Pennsylvania
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='8796093022208'
                                        name='group[30989][8796093022208]'
                                        id='mce-group[30989]-30989-39'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-39'>
                                        Rhode Island
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='17592186044416'
                                        name='group[30989][17592186044416]'
                                        id='mce-group[30989]-30989-40'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-40'>
                                        South Carolina
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='35184372088832'
                                        name='group[30989][35184372088832]'
                                        id='mce-group[30989]-30989-41'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-41'>
                                        South Dakota
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='70368744177664'
                                        name='group[30989][70368744177664]'
                                        id='mce-group[30989]-30989-42'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-42'>
                                        Tennessee
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='140737488355328'
                                        name='group[30989][140737488355328]'
                                        id='mce-group[30989]-30989-43'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-43'>
                                        Texas
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='281474976710656'
                                        name='group[30989][281474976710656]'
                                        id='mce-group[30989]-30989-44'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-44'>
                                        Utah
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='562949953421312'
                                        name='group[30989][562949953421312]'
                                        id='mce-group[30989]-30989-45'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-45'>
                                        Vermont
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='1125899906842624'
                                        name='group[30989][1125899906842624]'
                                        id='mce-group[30989]-30989-46'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-46'>
                                        Virginia
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='2251799813685248'
                                        name='group[30989][2251799813685248]'
                                        id='mce-group[30989]-30989-47'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-47'>
                                        Washington
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='4503599627370496'
                                        name='group[30989][4503599627370496]'
                                        id='mce-group[30989]-30989-48'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-48'>
                                        West Virginia
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='9007199254740992'
                                        name='group[30989][9007199254740992]'
                                        id='mce-group[30989]-30989-49'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-49'>
                                        Wisconsin
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='18014398509481984'
                                        name='group[30989][18014398509481984]'
                                        id='mce-group[30989]-30989-50'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30989]-30989-50'>
                                        Wyoming
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div className='mc-field-group input-group mb-4'>
                            <p className='mb-1 small' style={{ color: '#212529', fontWeight: '600' }}>
                                How will updates be useful for you? (optional)
                            </p>
                            <ul className='no-indents no-bullets mb-0'>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='1'
                                        name='group[30977][1]'
                                        id='mce-group[30977]-30977-0'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30977]-30977-0'>
                                        I am a survivor who might benefit from policy changes
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='2'
                                        name='group[30977][2]'
                                        id='mce-group[30977]-30977-1'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30977]-30977-1'>
                                        Policy changes might help me better support survivors as a service provider
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='4'
                                        name='group[30977][4]'
                                        id='mce-group[30977]-30977-2'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30977]-30977-2'>
                                        I am involved in policy advocacy and want to stay up to date
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type='checkbox'
                                        value='8'
                                        name='group[30977][8]'
                                        id='mce-group[30977]-30977-3'
                                    />
                                    <label className='checkbox small' htmlFor='mce-group[30977]-30977-3'>
                                        Other
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div id='mce-responses' className='clear'>
                            <div className='response' id='mce-error-response' style={{ display: 'none' }}></div>
                            <div className='response' id='mce-success-response' style={{ display: 'none' }}></div>
                        </div>
                        <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden='true'>
                            <input type='text' name='b_709a0a051cd8a5f3df002da88_54b262f0fa' tabIndex='-1' value='' />
                        </div>
                        <div className='clear'>
                            <Submit />
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default StateUpdates
