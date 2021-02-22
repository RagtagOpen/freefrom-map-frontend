import React from 'react'
import Modal from "components/modal/Modal";
import Input from "components/forms/Input";
import Submit from "components/forms/Submit";

const ReportMissingInfo = () => (
    <Modal target="report-missing-info"
        text="Report missing info"
        title="Report missing info">
        <p className="small font-italic">
            With the help of some truly incredible pro bono partners, FreeFrom was able to complete research on policies impacting survivors’ financial security in every state and D.C. One of our priorities is to ensure that all of the information in our tool is correct and up-to-date. To that end, we welcome any correction on inaccurate or incomplete information. Thank you in advance for helping us make the Policy Map and Scorecard the best tool it can possibly be!
        </p>
        <form>
            <Input name="what-is-outdated" required={ true } label="What information is missing or outdated?
  (Please provide as much information as you can.)"/>
            <Input name="email" label="Your email (optional)" />
            <Submit />
        </form>
    </Modal>
)

export default ReportMissingInfo
