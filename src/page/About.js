import React from 'react';
import { motion } from 'framer-motion';
import { FaBolt, FaShieldAlt, FaBullseye, FaEye, FaHeart } from 'react-icons/fa';
import { GiCommercialAirplane } from 'react-icons/gi';
import { BsGraphUp } from 'react-icons/bs';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import '../App.css';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const About = () => {
  return (
    <div className="about-wrapper overflow-hidden">

      {/* 1. Premium Hero Section */}
      <section className="relative py-5" style={{ backgroundColor: '#f1f2d9', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container py-5 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-uppercase fw-bold text-muted mb-3 d-block"
            style={{ letterSpacing: '4px', fontSize: '0.85rem' }}
          >
            The Journey
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="display-2 fw-bold mb-4 text-dark"
          >
            Redefining <span style={{ color: '#667eea', fontStyle: 'italic' }}>Modern Shopping</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="lead text-muted mx-auto" style={{ maxWidth: '750px', lineHeight: '1.8' }}
          >
            We curate exceptional products that seamlessly integrate into your lifestyle,
            combining timeless aesthetics with cutting-edge convenience.
          </motion.p>
        </div>
      </section>

      {/* 2. Brand Story / Identity */}
      <section className="py-5 my-lg-5">
        <div className="container py-lg-4">
          <div className="row align-items-center g-5">
            <motion.div {...fadeInUp} className="col-lg-6">
              <div className="position-relative p-2 p-md-4">
                {/* Decorative blob/accent behind image */}
                <div
                  className="position-absolute rounded-circle"
                  style={{ width: '80%', height: '80%', backgroundColor: '#f1f2d9', top: '10%', right: '-5%', zIndex: 0, filter: 'blur(3xl)' }}
                ></div>
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
                  alt="Our Team"
                  className="img-fluid rounded-4 shadow-lg position-relative"
                  style={{ zIndex: 1, objectFit: 'cover', height: '500px', width: '100%' }}
                />
              </div>
            </motion.div>
            <motion.div {...fadeInUp} className="col-lg-6 ps-lg-5">
              <h2 className="fw-bold mb-4 display-5 text-dark">We are MyShop.</h2>
              <p className="text-muted fs-5 mb-4" style={{ lineHeight: '1.8' }}>
                Founded with a simple yet ambitious idea: <strong>E-commerce should feel personal and premium.</strong>
                What started as a small curated collection has now evolved into a global destination for modern shoppers.
                We prioritize quality, sustainability, and unparalleled customer service.
              </p>
              <div className="row g-4 mb-5 mt-2">
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-3 p-3 rounded-4 bg-white shadow-sm hover-shadow-lg transition-all">
                    <div className="icon-box-sm text-white" style={{ backgroundColor: '#667eea' }}>
                      <FaBolt />
                    </div>
                    <span className="fw-semibold">Ultra Fast Delivery</span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-3 p-3 rounded-4 bg-white shadow-sm hover-shadow-lg transition-all">
                    <div className="icon-box-sm text-white bg-dark">
                      <FaShieldAlt />
                    </div>
                    <span className="fw-semibold">100% Trusted Hub</span>
                  </div>
                </div>
              </div>
              <button className="btn btn-dark px-5 py-3 rounded-pill fw-bold shadow-sm custom-gradient-btn">
                Read the full story
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Global Impact */}
      <section className="py-5 text-white position-relative" style={{ background: 'linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)' }}>
        <div className="container py-5">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="row g-4 text-center"
          >
            {[
              { icon: <GiCommercialAirplane />, count: '500K+', label: 'Happy Users' },
              { icon: <BsGraphUp />, count: '10K+', label: 'Premium Items' },
              { icon: <FaShieldAlt />, count: '24/7', label: 'Smart Support' },
              { icon: <RiSecurePaymentLine />, count: '100%', label: 'Secure Portal' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="col-6 col-md-3"
              >
                <div className="fs-1 mb-3" style={{ color: '#f1f2d9' }}>{stat.icon}</div>
                <h3 className="display-4 fw-bold mb-1 text-white">{stat.count}</h3>
                <p className="text-white-50 small text-uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Core Pillars */}
      <section className="py-5 my-5">
        <div className="container">
          <div className="text-center mb-5 pb-3">
            <motion.h2 {...fadeInUp} className="display-5 fw-bold">Our Core Pillars</motion.h2>
            <motion.div {...fadeInUp} className="mx-auto" style={{ height: '3px', width: '60px', backgroundColor: '#667eea', marginTop: '1rem' }}></motion.div>
          </div>
          <div className="row g-4">
            {[
              { icon: <FaBullseye />, title: 'Mission', desc: 'To make high-quality lifestyle products accessible to every household worldwide, bridging the gap between luxury and affordability.', color: '#667eea' },
              { icon: <FaEye />, title: 'Vision', desc: 'Setting the gold standard for customer-centric digital commerce by 2030, empowering individuals to express themselves.', color: '#20c997' },
              { icon: <FaHeart />, title: 'Values', desc: 'Radical transparency, relentless innovation, and people-first decision making. We believe in doing the right thing, always.', color: '#e83e8c' }
            ].map((pillar, i) => (
              <motion.div
                key={i} {...fadeInUp} transition={{ delay: i * 0.15 }}
                className="col-md-4"
              >
                <div className="card h-100 border-0 shadow-sm hover-shadow-lg transition-all p-5 rounded-4 bg-white text-center">
                  <div className="icon-box mx-auto mb-4 text-white shadow" style={{ backgroundColor: pillar.color, fontSize: '1.8rem', width: '70px', height: '70px', borderRadius: '20px' }}>
                    {pillar.icon}
                  </div>
                  <h4 className="fw-bold mb-3" style={{ fontSize: '1.75rem' }}>{pillar.title}</h4>
                  <p className="text-muted mb-0" style={{ lineHeight: '1.7' }}>{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Modern CTA */}
      <section className="py-5 mb-5">
        <div className="container">
          <motion.div
            {...fadeInUp}
            className="p-5 rounded-5 text-center text-white shadow-lg position-relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              zIndex: 1
            }}
          >
            {/* Background decorative circles */}
            <div className="position-absolute rounded-circle" style={{ width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', top: '-100px', left: '-100px', zIndex: -1 }}></div>
            <div className="position-absolute rounded-circle" style={{ width: '200px', height: '200px', background: 'rgba(255,255,255,0.05)', bottom: '-50px', right: '-50px', zIndex: -1 }}></div>

            <h2 className="display-4 fw-bold mb-3 text-white">Ready to Join the Revolution?</h2>
            <p className="lead mb-5 pb-2 text-white-50 mx-auto" style={{ maxWidth: '600px' }}>
              Join 500,000+ shoppers who have already switched to a better, more premium experience.
            </p>
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <Link to="/products" className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-bold shadow-sm text-dark transition-all hover-shadow-lg" style={{ fontSize: '1.1rem' }}>
                Start Shopping
              </Link>
              <Link to="/contact" className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill fw-bold transition-all" style={{ fontSize: '1.1rem', borderWidth: '2px' }}>
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;