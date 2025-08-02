import React from 'react';
import { 
  FaBolt, 
  FaShieldAlt, 
  FaBullseye, 
  FaEye, 
  FaHeart,
  FaArrowRight,
  FaShoppingCart,
  FaEnvelope
} from 'react-icons/fa';
import { GiCommercialAirplane } from 'react-icons/gi';
import { BsGraphUp } from 'react-icons/bs';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { Link, Links } from 'react-router-dom';

function About() {
  return (
    <div className="">
      {/* Hero Section */}
      <div className="py-5 bg-light">
        <div className="container py-5">
          <div className="text-center mb-5 animate-fade-in">
            <h1 className="fw-bold display-4 mb-3">About MyShop</h1>
            <p className="fs-4 mb-0" style={{ opacity: 0.9 }}>
              We're redefining online shopping with passion and purpose
            </p>
          </div>
        </div>
      </div>

      {/* Image + Text Section */}
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 slide-in-left">
            <div className="position-relative">
              <img
                src="https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWNvbW1lcmNlfGVufDB8fDB8fHww"
                alt="About MyShop"
                className="img-fluid rounded-4 shadow-lg"
              />
              <div className="position-absolute bottom-0 start-0 bg-white p-3 rounded-end shadow-sm">
                <h5 className="mb-0 text-dark">Since 2015</h5>
                <small className="text-muted">Trusted by 500K+ customers</small>
              </div>
            </div>
          </div>

          <div className="col-lg-6 slide-in-right">
            <h2 className="fw-bold mb-4 display-6">Who We Are</h2>
            <p className="lead text-muted mb-4">
              MyShop isn't just another online store - we're a movement towards smarter, more meaningful shopping experiences.
            </p>
            <div className="d-flex mb-4">
              <div className="me-4">
                <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 d-inline-flex mb-2">
                  <FaBolt className="fs-4" />
                </div>
                <h5 className="fw-semibold">Fast Delivery</h5>
                <p className="text-muted small">90% orders shipped within 24hrs</p>
              </div>
              <div>
                <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 d-inline-flex mb-2">
                  <FaShieldAlt className="fs-4" />
                </div>
                <h5 className="fw-semibold">Quality Guarantee</h5>
                <p className="text-muted small">30-day hassle-free returns</p>
              </div>
            </div>
            <button className="btn btn1 px-4 py-2 rounded-pill">
              Learn More About Us <FaArrowRight className="ms-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-5 bg-white">
        <div className="container py-3">
          <div className="row g-4 text-center">
            <div className="col-md-3 animate-pop-in" style={{ animationDelay: '0.1s' }}>
              <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 d-inline-flex mb-3">
                <GiCommercialAirplane className="fs-2" />
              </div>
              <h2 className="display-4 fw-bold text-primary">500K+</h2>
              <p className="text-muted">Happy Customers</p>
            </div>
            <div className="col-md-3 animate-pop-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 d-inline-flex mb-3">
                <BsGraphUp className="fs-2" />
              </div>
              <h2 className="display-4 fw-bold text-primary">10K+</h2>
              <p className="text-muted">Products Available</p>
            </div>
            <div className="col-md-3 animate-pop-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 d-inline-flex mb-3">
                <FaShieldAlt className="fs-2" />
              </div>
              <h2 className="display-4 fw-bold text-primary">24/7</h2>
              <p className="text-muted">Customer Support</p>
            </div>
            <div className="col-md-3 animate-pop-in" style={{ animationDelay: '0.4s' }}>
              <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 d-inline-flex mb-3">
                <RiSecurePaymentLine className="fs-2" />
              </div>
              <h2 className="display-4 fw-bold text-primary">100%</h2>
              <p className="text-muted">Secure Payments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission/Vision Section */}
      <div className="container py-5 my-5">
        <div className="row g-4 animate-fade-in">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 d-inline-flex mb-3">
                  <FaBullseye className="fs-4" />
                </div>
                <h4 className="fw-bold mb-3">Our Mission</h4>
                <p className="text-muted mb-0">
                  To revolutionize e-commerce by making quality products accessible to everyone, delivered with speed and care.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 d-inline-flex mb-3">
                  <FaEye className="fs-4" />
                </div>
                <h4 className="fw-bold mb-3">Our Vision</h4>
                <p className="text-muted mb-0">
                  To create a global marketplace where trust and convenience meet innovation and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 d-inline-flex mb-3">
                  <FaHeart className="fs-4" />
                </div>
                <h4 className="fw-bold mb-3">Our Values</h4>
                <p className="text-muted mb-0">
                  Integrity, innovation, customer-first approach, and sustainable growth drive everything we do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team CTA */}
      <div className="py-5 bg-light">
        <div className="container py-5 text-center">
          <div className="animate-fade-in">
            <h2 className="fw-bold display-6 mb-4">Join Our Growing Community</h2>
            <p className="fs-5 mb-4 mx-auto" style={{ maxWidth: '700px', opacity: 0.9 }}>
              Become part of the OnlineStore family today and experience shopping reimagined.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link to='/products'>
                <button className="btn btn1 text-light px-4 py-2 rounded-pill fw-medium">
                   <FaShoppingCart className="me-2" /> Shop Now
                </button>
              </Link>
              <Link to='/contact'>
                 <button className="btn btn-outline px-4 py-2 rounded-pill fw-medium">
                   <FaEnvelope className="me-2" /> Contact Us
                 </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;