export const submitForm = (path) => async values => {
    const res = await fetch(
        // FIXME: use process.env.API_ENDPOINT
        `http://localhost:5000/forms/${path}`,
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
        console.log(result)
        alert('Thanks for your response! Someone will be in touch with you soon.')
    } catch (error) {
        alert('Error submitting form! Please try again later.')
    }
}
