// pages/Flight.js
import React from "react";
import Image from "next/image";
import Menu from "../../components/Menu";
import "../../css/style.css";

const Login = () => {
  return (
    <div className="container">
      <Menu />
      <div className="background">
        <Image
          src="/Images/saturn.jpg"
          layout="fill"
          objectFit="cover"
          alt="Mars"
        />
      </div>
      <div className="content">


        <div className="login-container">
          <div className="login-box">
            <h1 className="login-title">Login</h1>
            <form className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
              </div>
              <button type="submit" className="login-button">
                Se connecter
              </button>
            </form>
            <p className="forgot-password">Mot de passe oublié ?</p>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Login;
