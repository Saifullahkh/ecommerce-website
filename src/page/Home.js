import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from "react-icons/fi"; // Modern arrow icon
import ProductCategory from './ProductCategory';
import SubscribeEmail from '../component/SubscribeEmail';
import '../App.css';
import { Link } from 'react-router-dom';

// Scroll Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

function Home() {
  return (
    <main className="home-page-wrapper">
     <section className="hero-wrapper">
      <div className="hero-overlay"></div> {/* Background ko dark shade dene ke liye */}
      
      <div className="container h-100 d-flex align-items-center justify-content-center">
        <div className="row justify-content-center w-100">
          <div className="col-lg-8 text-center text-white z-index-1">
            
            {/* Tagline Animation */}
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-uppercase tracking-widest fw-semibold mb-3 d-block"
              style={{ letterSpacing: '3px', color: '#f1f2d9' }}
            >
              New Collection 2026
            </motion.span>

            {/* Main Title Animation */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="display-2 fw-bold mb-4 header-title"
            >
              Elevate Your <span style={{ color: '#f1f2d9' }}>Lifestyle</span>
            </motion.h1>

            {/* Subtext Animation */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lead mb-5 px-md-5 opacity-75"
            >
              Experience the perfect blend of modern fashion and timeless elegance. 
              Handpicked trends delivered right to your doorstep.
            </motion.p>

            {/* Button Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/products" className="btn btn-hero px-5 py-3 rounded-pill fw-bold shadow-lg d-inline-flex align-items-center gap-2">
                Explore Shop <FiArrowRight />
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </section>

      {/* 2. Featured Categories Section */}
      <section className="py-5 bg-light">
        <div className="container py-lg-5">
          <motion.div {...fadeInUp} className="text-center mb-5">
            <h2 className="fw-bold display-6">Shop by Category</h2>
            <div className="mx-auto bg-dark" style={{ height: '3px', width: '60px' }}></div>
          </motion.div>
          
          <motion.div {...fadeInUp}>
             <ProductCategory />
          </motion.div>
        </div>
      </section>

      {/* 3. Value Proposition (Optional Professional Touch) */}
      <section className="py-5 border-top border-bottom">
        <div className="container">
          <div className="row text-center g-4">
            {[
              { title: 'Free Shipping', desc: 'On orders over $100' },
              { title: 'Secure Payment', desc: '100% safe checkout' },
              { title: '24/7 Support', desc: 'Dedicated assistance' }
            ].map((feature, index) => (
              <div key={index} className="col-md-4">
                <h5 className="fw-bold mb-1">{feature.title}</h5>
                <p className="text-muted small">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Newsletter Section */}
      <section className=" overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SubscribeEmail />
        </motion.div>
      </section>
    </main>
  );
}

export default Home;