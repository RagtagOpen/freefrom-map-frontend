import Cookies from 'universal-cookie'

export const COOKIE_KEY = 'map-cookie'
const cookies = new Cookies()

export const setCookiesInLocalStorage = (value) => {
    cookies.set(COOKIE_KEY, value)
}

export const getCookiesFromLocalStorage = () => {
    return cookies.get(COOKIE_KEY)
}
