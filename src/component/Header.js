import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoPersonCircleSharp } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import '../App.css';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo3.png'


function Header() {
   const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const { 
  cartItems, 
  cartCount, 
} = useCart();
  useEffect(() => {
  console.log('Cart updated - Count:', cartCount, 'Items:', cartItems);
}, [cartCount, cartItems]);
  return (
    <nav className="navbar navbar-expand-md py-3" style={{ backgroundColor: '#f1f2d9' }}>
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} height='60px' />
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapse Wrapper */}
        <div className="collapse navbar-collapse justify-content-between align-items-center" id="navbarContent">
          {/* Center: Nav Links */}
          <ul className="navbar-nav flex-md-row flex-column gap-lg-3 mx-auto text-md-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Product</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>

          {/* Right: Icons */}
          <div className="d-flex align-items-center gap-3  justify-content-md-center ">
            <div className="dropdown">
      <button
        className="btn border-0 bg-transparent dropdown-toggle"
        type="button"
        onClick={() => setOpen(!open)}
      >
        <IoPersonCircleSharp className="fs-2 text-dark" />
      </button>
      <ul className={`dropdown-menu dropdown-menu-end ${open ? "show" : ""}`}>
        <li>
          <Link className="dropdown-item" to="/profile">
            Profile
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/settings">
            Settings
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/privacy">
            Privacy
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button className="dropdown-item text-danger" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
            <Link to="/cart" className="text-dark fs-4 fw-bold position-relative">
              <CiShoppingCart />
              {cartCount > 0 && (
                <span className="position-absolute cart-badge rounded-pill btn1">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
