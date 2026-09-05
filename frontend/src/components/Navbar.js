// src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, Upload, Edit3, Home as HomeIcon } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <Cpu className="brand-icon" />
          <span>Wireframe2UI</span>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
          <HomeIcon size={18} /> Home
        </Link>
        <Link to="/upload" className={`nav-link ${location.pathname === '/upload' ? 'active' : ''}`}>
          <Upload size={18} /> Upload
        </Link>
        <Link to="/editor" className={`nav-link ${location.pathname === '/editor' ? 'active' : ''}`}>
          <Edit3 size={18} /> Editor
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;