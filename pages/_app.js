import { useEffect } from 'react'

// CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        import('jquery').then(($) => {
            // jQuery must be installed to the `window`:
            window.$ = window.jQuery = $
            return import('bootstrap')
        })
    }, [])

    return <Component {...pageProps} />
}
