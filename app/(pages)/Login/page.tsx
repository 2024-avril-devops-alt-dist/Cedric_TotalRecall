// pages/Login.js
"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Menu from "../../components/Menu";
import { Input, Button } from "../../components/Form";
import "../../css/style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      console.error(result.error);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="container">
      <Menu background="saturn.jpg" />
      <div className="content">
        <div className="login-container">
          <div className="login-box">
            <h1 className="login-title">Se connecter</h1>
            <form className="login-form" onSubmit={handleSubmit}>
              <Input
                className="form-control"
                type="email"
                id="email"
                name="email"
                label="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeHolder="Votre email"
              />
              <Input
                className="form-control"
                type="password"
                id="password"
                name="password"
                label="Mot de passe"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeHolder="Votre mot de passe"
              />

              <Button 
                className="login-button"
                type="submit" 
                title="Se connecter"
              />
                
            </form>
            <p className="forgot-password">Mot de passe oublié ?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
