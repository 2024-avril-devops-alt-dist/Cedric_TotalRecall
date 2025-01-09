// app/page.js
import React from 'react';
import Menu from './components/Menu';
import './css/style.css';

const HomePage = () => {
  return (
    <div className="container">
      <Menu background="mars3.jpg"/>
      <div className="overlay"></div>
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
