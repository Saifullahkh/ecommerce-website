import React from 'react';
import { motion } from 'framer-motion';
import { FaBolt, FaShieldAlt, FaBullseye, FaEye, FaHeart } from 'react-icons/fa';
import { GiCommercialAirplane } from 'react-icons/gi';
import { BsGraphUp } from 'react-icons/bs';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const About = () => {
  return (
    <div className="about-wrapper overflow-hidden">
      
      {/* 1. Minimalist Hero Section */}
      <section className="relative py-5 border-bottom" style={{ backgroundColor: '#f1f2d9' }}>
        <div className="container py-5 text-center">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-uppercase tracking-widest fw-bold text-muted small mb-2 d-block"
          >
            Our Story
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="display-3 fw-bold mb-4"
          >
            Redefining <span className="text-primary-emphasis">Modern Shopping</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}
          >
            We don't just sell products; we deliver experiences that blend innovation with timeless customer values.
          </motion.p>
        </div>
      </section>

      {/* 2. Brand Story (Image + Text) */}
      <section className="py-5 my-lg-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <motion.div {...fadeInUp} className="col-lg-6">
              <div className="position-relative p-3">
                <div className="about-img-accent"></div>
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
                  alt="Our Team"
                  className="img-fluid rounded-4 shadow-lg position-relative z-index-1"
                />
              </div>
            </motion.div>
            <motion.div {...fadeInUp} className="col-lg-6">
              <h2 className="fw-bold mb-4 display-5">We are MyShop.</h2>
              <p className="text-muted fs-5 mb-4">
                Founded in 2015, we started with a simple idea: <strong>E-commerce should be personal.</strong> Today, we serve over 500,000 customers globally, but our core mission remains the same.
              </p>
              <div className="row g-4 mb-4">
                <div className="col-6">
                  <div className="d-flex align-items-center gap-3">
                    <div className="icon-box-sm bg-primary bg-opacity-10 text-primary">
                      <FaBolt />
                    </div>
                    <span className="fw-bold">Ultra Fast</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center gap-3">
                    <div className="icon-box-sm bg-success bg-opacity-10 text-success">
                      <FaShieldAlt />
                    </div>
                    <span className="fw-bold">Trusted Hub</span>
                  </div>
                </div>
              </div>
              <button className="btn btn-dark px-5 py-3 rounded-pill fw-bold">
                Read the full story
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Global Impact (Stats) */}
      <section className="py-5 bg-dark text-white rounded-5 mx-2 mx-md-5 my-5 shadow-2xl">
        <div className="container py-5">
          <div className="row g-4 text-center">
            {[
              { icon: <GiCommercialAirplane />, count: '500K+', label: 'Happy Users' },
              { icon: <BsGraphUp />, count: '10K+', label: 'Premium Items' },
              { icon: <FaShieldAlt />, count: '24/7', label: 'Smart Support' },
              { icon: <RiSecurePaymentLine />, count: '100%', label: 'Secure Portal' }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="col-6 col-md-3"
              >
                <div className="fs-1 mb-2 text-primary-light" style={{ color: '#f1f2d9' }}>{stat.icon}</div>
                <h3 className="display-5 fw-bold mb-0">{stat.count}</h3>
                <p className="text-white-50 small text-uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Core Pillars (Cards) */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {[
              { icon: <FaBullseye />, title: 'Mission', desc: 'To make high-quality lifestyle products accessible to every household worldwide.' },
              { icon: <FaEye />, title: 'Vision', desc: 'Setting the gold standard for customer-centric digital commerce by 2030.' },
              { icon: <FaHeart />, title: 'Values', desc: 'Radical transparency, relentless innovation, and people-first decision making.' }
            ].map((pillar, i) => (
              <motion.div 
                key={i} {...fadeInUp} transition={{ delay: i * 0.1 }}
                className="col-md-4"
              >
                <div className="card h-100 border-0 shadow-sm hover-shadow-lg transition-all p-4 rounded-4">
                  <div className="icon-box bg-light text-primary mb-4">
                    {pillar.icon}
                  </div>
                  <h4 className="fw-bold mb-3">{pillar.title}</h4>
                  <p className="text-muted mb-0">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Modern CTA */}
      <section className="py-5 my-5">
        <div className="container">
          <div className="cta-gradient p-5 rounded-5 text-center text-white shadow-lg">
            <h2 className="display-5 fw-bold mb-3">Ready to Join the Revolution?</h2>
            <p className="lead mb-4 opacity-75">Join 500,000+ shoppers who have already switched to a better experience.</p>
            <div className="d-md-flex justify-content-center gap-3">
              <Link to="/products" className="btn btn-light btn-lg px-4 rounded-pill fw-bold mb-3 mb-md-0">
                Start Shopping
              </Link>
              <Link to="/contact" className="btn btn-outline-light btn-lg px-4 rounded-pill">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;