// pages/Flight.js
import React from 'react';
import Menu from '../components/Menu';
import '../css/style.css';

const FlightPage = () => {
  return (
    <div className="container">
      <Menu />
      <div className="content">
        <h1>Flight Page</h1>
        <p>Welcome to the Flight page. Here you can find information about our flights.</p>
      </div>
    </div>
  );
};

export default FlightPage;
