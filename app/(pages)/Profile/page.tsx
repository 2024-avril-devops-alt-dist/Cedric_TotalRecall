// pages/Profile.js
"use client";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Menu from "../../components/Menu";
import "../../css/style.css";
import { Link } from "react-admin";

const Profile = () => {
  const { data: session } = useSession();
  console.log("Session", session)

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  if (!session) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <Menu background="saturn.jpg"/>
      <div className="content">
        <div className="login-container">
          <div className="login-box">
            <h1 className="login-title">Bienvenue  {session.user?.name}</h1>
            <button onClick={handleSignOut} className="logout-button">
              Se déconnecter
            </button>
            <p>Ton rôle est : {session.user?.role} </p>
            {session.user?.role ==="ADMIN" && (
              <h2>
                <a className="login-button reserve" href="/Admin" >Acceder à administration</a>
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
