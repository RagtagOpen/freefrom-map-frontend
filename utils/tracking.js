import ReactGA from "react-ga"
import { getCookiesFromLocalStorage } from 'utils';

export const trackEvent = ({ category, action, label='' }) => {
    if(getCookiesFromLocalStorage && process.env.NEXT_PUBLIC_GA_ID) {
        ReactGA.event({
            category: category,
            action: action,
            label: label,
        });
    }
}
