// app/page.js
import React from 'react';
import Image from 'next/image';
import Menu from './components/Menu';
import './css/style.css';

const HomePage = () => {
  return (
    <div className="container">
      <div className="background">
        <Image src="/Images/mars3.jpg" layout="fill" objectFit="cover" alt="Mars" />
      </div>
      <div className="overlay"></div>
      <Menu />
      <div className="content">
        <div className="title-section">
          <h1 className="title">A new dawn, Mars</h1>
          <p className="subtitle">The new step of humanity, reachable since... now.</p>
          <p className="texte">Over 62 million km from Earth</p>
          <button className="button">Click here to see more!</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
