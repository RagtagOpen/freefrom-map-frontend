export const checkFormStatus = (props) => {
    if (props.status) {
        if (props.status.success) {
            return <p>
          Thanks for your response! Someone will be in touch with you soon.
                <button onClick={props.resetForm}>
            Reset
                </button>
            </p>
        } else {
            return <p>
        Error submitting form! Please try again later.
                <button onClick={props.resetForm}>
          Reset
                </button>
            </p>
        }
    }
    return null
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
