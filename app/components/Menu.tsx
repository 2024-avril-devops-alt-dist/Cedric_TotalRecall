// components/Menu.js
"use client";
import React, { useState }  from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import '../css/Menu.css';
import { FaRocket, FaBars } from "react-icons/fa";

interface MenuProps {
  background: string;
}
const Menu: React.FC<MenuProps> = ({background}) => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session } = useSession();
  
    const isActive = (path : string) => {
        return pathname === path ? 'active' : '';
    };
    
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
    <div className="menu">
    <button className="menu-burger" onClick={toggleMenu}>
      <FaBars />
    </button>
      <nav className={`menu-links ${isMenuOpen ? 'open' : ''}`}>
        <Link href="/Flight" className={`menu-link ${isActive('/Flight')}`}>Destinations</Link>
        <Link href="/Reservation" className={`menu-link ${isActive('/Reservation')}`}>Reservations</Link>
        <Link href="/"  className={`menu-link ${isActive('/')}`}>Space Travel <FaRocket className="icon" /></Link>
        <Link href="/Contact" className={`menu-link ${isActive('/Contact')}`}>Compagnies</Link>
        {session ? (
                    <Link href="/Profile" className={`menu-link ${isActive('/Profile')}`}>Profile</Link>
                ) : (
                    <Link href="/Login" className={`menu-link ${isActive('/Login')}`}>Login</Link>
                )}
      </nav>
    </div>
      <div className="background">
        <Image 
          src={`/Images/${background}`} 
          fill
          style={{ objectFit: 'cover' }}
          alt="Image de fond d'écran" 
          />
      </div>
    </>
  );
};

export default Menu;
