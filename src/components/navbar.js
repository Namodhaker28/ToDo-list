import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css";

const NavbarComponent = () => {
  return (
    <div className="container">
      <div className="logo">
        <Link to="/">Your ToDo</Link>
      </div>
      <div className="links">
        <Link to="/about">You</Link>
         <Link onClick={()=>{localStorage.removeItem("token"); window.reload()}} to="/login">{localStorage.getItem("token") ? "Logout" : "Login"}</Link> 
      </div>
    </div>
  );
};

export default NavbarComponent;
