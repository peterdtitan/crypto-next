import React, {useState} from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {

    return (
      <div className="w-screen font-montserrat">
          <NavBar />
          <main>{children}</main>
          <Footer />
      </div>
    );
  };
  
  export default Layout;