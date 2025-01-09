// pages/Flight.js
import React from 'react';
import Menu from '../../components/Menu';
import '../../css/style.css';

const Reservation = () => {
  return (
    <div className="container">
      <Menu background="mars2.jpg"/>
      <div className="content">
        <h1>Reservation</h1>
        <p>Welcome to the Flight page. Here you can find information about our flights.</p>
      </div>
    </div>
  );
};

export default Reservation;
