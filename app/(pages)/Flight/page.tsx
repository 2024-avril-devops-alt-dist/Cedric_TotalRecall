// pages/Flight.js
import React from 'react';
import Image from 'next/image';
import Menu from '../../components/Menu';
import '../../css/style.css';

const FlightPage = () => {
  return (
    <div className="container">
      <Menu />
      <div className="background">
        <Image src="/Images/andromede.jpg" layout="fill" objectFit="cover" alt="Mars" />
      </div>
      <div className="content">
        <h1>Vols</h1>
        <p>Welcome to the Flight page. Here you can find information about our flights.</p>
      </div>
    </div>
  );
};

export default FlightPage;
