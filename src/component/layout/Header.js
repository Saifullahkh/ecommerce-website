import React from 'react'
import '../../App.css'
import { Link } from 'react-router-dom'
import Login from '../../pages/button/Login';
import Signup from '../../pages/button/Signup';
import CartBtn from '../../pages/button/CartBtn';


function Header() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
            <a class="navbar-brand fs-3 py-2 fw-bold text-white" href="#">APPLE MART</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <Link to='/' class="nav-link fs-5 text-white">Home</Link>
                </li>
                <li class="nav-item">
                  <Link to='/product' class="nav-link fs-5 mx-md-3 text-white">Product</Link>
                </li>
                <li class="nav-item">
                  <Link to='/about' class="nav-link fs-5 text-white">About</Link>
                </li>
                <li class="nav-item">
                  <Link to='/contact' class="nav-link fs-5 mx-md-3 text-white">Contact</Link>
                </li>
            </ul>
            <div className='nav '>
              <Login />
              <Signup />
              <CartBtn />
            </div>
            </div>
        </div>
        </nav>
    </div>
  )
}

export default Header
