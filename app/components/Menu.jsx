// components/Menu.js
import React from 'react';
import Link from 'next/link';
import '../css/Menu.css';
import { FaRocket   } from "react-icons/fa";

const Menu = () => {
  return (
    <div className="menu">
      <nav className="menu-links">
      <Link href="/Flight" className="menu-link">Fly</Link>
        <a href="#reservations" className="menu-link">Reservations</a>
        <a href="/"  className="menu-link">Space Travel <FaRocket className="icon" /></a>
        <a href="#contact" className="menu-link">Contact</a>
        <a href="#profile" className="menu-link">Profile</a>
      </nav>
    </div>
  );
};

export default Menu;
