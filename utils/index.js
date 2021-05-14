import { getCookiesFromLocalStorage, setCookiesInLocalStorage } from 'utils/cookies'
import { checkFormStatus, submitForm } from 'utils/forms'
import { toSlug } from 'utils/routing'
import { trackEvent, trackModal, trackPageView } from 'utils/tracking'

export {
    checkFormStatus,
    submitForm,
    toSlug,
    getCookiesFromLocalStorage,
    setCookiesInLocalStorage,
    trackEvent,
    trackModal,
    trackPageView
}
