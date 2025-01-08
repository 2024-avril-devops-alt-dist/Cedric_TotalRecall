// pages/Profile.js
"use client";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Menu from "../../components/Menu";
import "../../css/style.css";

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
            <h1 className="login-title">Bienvenue  {session.user?.name}</h1>
            <button onClick={handleSignOut} className="logout-button">
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
