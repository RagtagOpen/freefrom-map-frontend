import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function SharedLayout({ children }) {
  return (
    <div className='shared-layout'>
      <Navbar />
      <div className='content'>
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default SharedLayout;
