import React from 'react'
import Modal from "components/modal/Modal";
import Form from "components/forms/Form";
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
        {/* FIXME: Form.js component needs to be hooked to mailchimp */}
        <Form mailchimp form={() => (
            <form>
                <Input name="email" label="Your email" required />
                <p>Lorem ipsum states list</p>
                <Submit />
            </form>
        )}/>
    </Modal>
)

export default StateUpdates
