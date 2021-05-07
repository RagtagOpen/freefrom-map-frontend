import ReactGA from "react-ga"
import { getCookiesFromLocalStorage } from 'utils';

export const trackPageView = (url) => {
    if(getCookiesFromLocalStorage && process.env.NEXT_PUBLIC_GA_ID) {
        ReactGA.pageview(url);
    }
}

export const trackEvent = ({ category, action, label='' }) => {
    if(getCookiesFromLocalStorage && process.env.NEXT_PUBLIC_GA_ID) {
        ReactGA.event({
            category: category,
            action: action,
            label: label,
        });
    }
}

export const trackModal = (name) => {
    if(getCookiesFromLocalStorage && process.env.NEXT_PUBLIC_GA_ID) {
        ReactGA.modalview(name);
    }
}
