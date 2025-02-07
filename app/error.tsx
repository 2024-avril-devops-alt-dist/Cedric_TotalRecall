// pages/Login.js
"use client";
import React from "react";
import Menu from "./components/Menu";
import "./css/style.css";

const Error = () => {

  return (
    <div className="container">
      <Menu background="saturn.jpg" />
      <div className="content">
        <div className="login-container">
          <div className="login-box">
            <h1 className="login-title">Error</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
