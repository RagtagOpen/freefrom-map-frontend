import React from 'react'
import { Formik, Form } from 'formik';

import Modal from "components/modal/Modal";
import Input from "components/forms/Input";
import Submit from "components/forms/Submit";

const StateUpdates = () => (
    <Modal
        target="state-updates"
        text="Sign up for state updates"
        title="Sign up for state updates">
        <p className="small font-italic">
            We'll be updating our mapping tool as states pass new policies. Sign up below and we'll send you an email when the state(s) you select passes a policy that impacts survivors' financial security.
        </p>
        {/* FIXME: needs to be hooked to mailchimp */}
        <Formik initialValues={{}} onSubmit={async values => console.log(values)}>
            <Form>
                <Input name="email" label="Your email" required />
                <p>Lorem ipsum states list</p>
                <Submit />
            </Form>
        </Formik>
    </Modal>
)

export default StateUpdates
