// pages/Flight.js
import React from "react";
import Image from "next/image";
import Menu from "../../../components/Menu";
import "../../../css/style.css";

const Reservation = () => {
  return (
    <div className="container">
      <Menu background="mars3.jpg" />
      <div className="background">
        <Image
          src="/Images/mars2.jpg"
          layout="fill"
          objectFit="cover"
          alt="Mars"
        />
      </div>
      <div className="content">
        <div className="box">
          <h1>Reservation</h1>
          <p>
            Welcome to the Flight page. Here you can find information about our
            flights.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
