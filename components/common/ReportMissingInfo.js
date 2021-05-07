import React from 'react'
import { Formik, Form } from 'formik';

import Modal from "components/modal/Modal";
import Input from "components/forms/Input";
import Submit from "components/forms/Submit";
import { checkFormStatus, submitForm } from 'utils'

const ReportMissingInfo = () => (
    <Modal target="report-missing-info"
        text="Report missing info"
        title="Report missing info">
        <p className="small font-italic">
            With the help of some truly incredible pro bono partners, FreeFrom was able to complete research on policies impacting survivors’ financial security in every state and D.C. One of our priorities is to ensure that all of the information in our tool is correct and up-to-date. To that end, we welcome any correction on inaccurate or incomplete information. Thank you in advance for helping us make the Policy Map and Scorecard the best tool it can possibly be!
        </p>
        <Formik initialValues={{}} onSubmit={submitForm("report-missing-info")}>
            {props => {
                const formStatus = checkFormStatus(props)
                if (formStatus) return formStatus
                return (
                    <Form>
                        <Input name="missing_or_outdated_info" label="What information is missing or outdated? (Please provide as much information as you can.)" required={ true } />
                        <Input name="email" label="Your email (optional)" type="email" />
                        <Submit />
                    </Form>
                )
            }}
        </Formik>
    </Modal>
)

export default ReportMissingInfo
