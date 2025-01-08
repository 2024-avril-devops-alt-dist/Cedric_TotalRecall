// pages/Login.js
"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Menu from "../../components/Menu";
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
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
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
