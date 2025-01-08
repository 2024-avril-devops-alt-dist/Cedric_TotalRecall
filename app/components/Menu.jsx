// components/Menu.js
"use client";
import React, { useState }  from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '../css/Menu.css';
import { FaRocket, FaBars } from "react-icons/fa";

const Menu = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
      console.log("------",pathname)
  
    const isActive = (path) => {
        return pathname === path ? 'active' : '';
    };
    
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="menu">
    <button className="menu-burger" onClick={toggleMenu}>
      <FaBars />
    </button>
      <nav className={`menu-links ${isMenuOpen ? 'open' : ''}`}>
        <Link href="/Flight" className={`menu-link ${isActive('/Flight')}`}>Destinations</Link>
        <Link href="/Reservation" className={`menu-link ${isActive('/Reservation')}`}>Reservations</Link>
        <Link href="/"  className={`menu-link ${isActive('/')}`}>Space Travel <FaRocket className="icon" /></Link>
        <Link href="/Contact" className={`menu-link ${isActive('/Contact')}`}>Contact</Link>
        <Link href="/Login" className={`menu-link ${isActive('/Login')}`}>Profile</Link>
      </nav>
    </div>
  );
};

export default Menu;
