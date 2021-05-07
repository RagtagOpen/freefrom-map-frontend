import React from "react";
import PropTypes from 'prop-types';
import { setCookiesInLocalStorage } from 'utils';

function CookiesConsent({ setCookie }) {
  return (
    <div className="fixed-top d-flex flex-column w-100 h-100 z-index-2">
      <div
        className="flex-fill bg-dark opacity-5"
        style={{ opacity: 0.5 }}
      ></div>
      <div
        className="bg-dark align-items-center p-5 d-flex flex-column"
        style={{ minWidth: "200px" }}
      >
        <p className="text-white text-center">
          This website uses cookies to ensure you get the best experience.{" "}
          <a
            href="https://www.cookiesandyou.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more.
          </a>
        </p>
        <div className="d-flex flex-row justify-content-center w-100">
          <button
            type="button"
            className="mr-3 btn btn-secondary"
            onClick={() => {
              setCookie(false);
              setCookiesInLocalStorage(false);
            }}
          >
            Decline
          </button>

          <button
            className="btn btn-primary"
            onClick={() => {
              setCookie(true);
              setCookiesInLocalStorage(true);
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

CookiesConsent.propTypes = {
    setCookie: PropTypes.func,
}

export default CookiesConsent;
