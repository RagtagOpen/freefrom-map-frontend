import Cookies from "universal-cookie";

export const COOKIE_KEY = "map-cookie";
const cookies = new Cookies();

export const setCookies = value => {
  cookies.set(COOKIE_KEY, value);
}

export const getCookies = () => {
  cookies.get(COOKIE_KEY);
}
