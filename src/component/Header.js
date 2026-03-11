import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { IoPersonCircleSharp, IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { motion, AnimatePresence } from 'framer-motion'; // For smooth animations
import { useCart } from '../context/CartContext';
import logo from '../assets/logo3.png';
import '../App.css';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cartCount } = useCart();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Dropdown ke bahar click karne par band karne ka logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logged out");
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-md py-2 sticky-top shadow-sm" style={{ backgroundColor: '#f1f2d9', minHeight: '80px' }}>
      <div className="container">
        
        {/* Brand/Logo with Hover Effect */}
        <Link className="navbar-brand" to="/">
          <motion.img 
            whileHover={{ scale: 1.05 }}
            src={logo} 
            height='50px' 
            alt="logo" 
          />
        </Link>

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto gap-lg-4">
            {['Home', 'Products', 'About', 'Contact'].map((item) => (
              <li className="nav-item" key={item}>
                <NavLink 
                  className={({ isActive }) => `nav-link fw-semibold ${isActive ? 'text-primary' : 'text-dark'}`}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right Side: Actions */}
          <div className="d-flex align-items-center gap-4">
            
            {/* Cart Icon with Animated Badge */}
            <Link to="/cart" className="text-dark fs-3 position-relative d-flex align-items-center">
              <CiShoppingCart />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: '0.6rem' }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Profile Dropdown */}
            <div className="dropdown" ref={dropdownRef}>
              <button
                className="btn p-0 border-0 d-flex align-items-center"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <IoPersonCircleSharp className="fs-1 text-secondary" />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.ul 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="dropdown-menu dropdown-menu-end show shadow border-0 mt-2"
                    style={{ borderRadius: '12px', overflow: 'hidden' }}
                  >
                    <li><Link className="dropdown-item py-2" to="/profile"><IoPersonCircleSharp className="me-2"/> Profile</Link></li>
                    <li><Link className="dropdown-item py-2" to="/settings"><IoSettingsOutline className="me-2"/> Settings</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger py-2" onClick={handleLogout}>
                        <IoLogOutOutline className="me-2" /> Logout
                      </button>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;