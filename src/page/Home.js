import React from 'react';
import '../App.css'; // We'll style the hero section here
import { Link } from 'react-router-dom';
import ProductCategory from './ProductCategory';
import SubscribeEmail from '../component/SubscribeEmail';

function Home() {
  return (
    <>
      <div className="hero-section d-flex align-items-center justify-content-center text-center text-white">
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to LuxeCart</h1>
          <p className="lead mb-4">Discover the latest trends in fashion & lifestyle</p>
          <Link to="/products" className="btn btn1 px-4 py-2 rounded-pill">Shop Now</Link>
        </div>
      </div>
      <ProductCategory />
      <SubscribeEmail />
    </>
  );
}

export default Home;
