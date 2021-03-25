import React from 'react'

export const checkFormStatus = (props) => {
    // If status has not been updated, form has not yet been submitted.
    if (!props.status) return null
    if (props.status.success) {
        return (
            <div className="col-12 col-lg-8 mb-5 mb-5 mt-5 alert alert-success" role="alert">
                <strong>Thanks for your response!</strong> Someone will be in touch with you soon.
                <a type="button" className="ml-1 alert-link" onClick={props.resetForm}>
                Submit another response
                </a>
            </div>
        )
    } else {
        return (
            <div className="col-12 col-lg-8 mb-5 mb-5 mt-5 alert alert-danger" role="alert">
                <strong>Error submitting form!</strong> Please try again later.{" "}
                <a type="button" className="ml-1 alert-link" onClick={props.resetForm}>
                  Try again
                </a>
            </div>
        )
    }
}

export const submitForm = path => {
    return async (values, {setSubmitting, setErrors, setStatus}) => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/forms/${path}`,
            {
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )
        try {
            const result = await res.json()
            if (res.status >= 400) {
                const message = result && result.description || 'Unknown error'
                throw new Error(message)
            }
            setStatus({success: true})
        } catch (error) {
            console.log(error)
            setStatus({success: false})
            setSubmitting(false)
            setErrors({submit: error.message})
        }
    }
}
