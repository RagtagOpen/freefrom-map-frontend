import { useEffect } from "react"
import { getCookiesFromLocalStorage } from 'utils';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        import("jquery").then($ => {
            // jQuery must be installed to the `window`:
            window.$ = window.jQuery = $;
            return import("bootstrap");
        });

        if(getCookiesFromLocalStorage && process.env.NEXT_PUBLIC_GA_ID) {
            ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID);
        }
    }, []);

    return <Component {...pageProps} />
}
