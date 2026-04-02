import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import { motion } from "framer-motion";
import emailjs from 'emailjs-com';
import { useRef, useState } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const Contact = () => {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(
        'service_gcy8bbn',
        'template_rfydhgh',
        formRef.current,
        'dOytzJSEIEs06u6ZD'
      )
      .then(
        () => {
          setIsSending(false);
          alert('✅ Message sent successfully! We will get back to you soon.');
          e.target.reset();
        },
        (error) => {
          setIsSending(false);
          console.log(error.text);
          alert('❌ Failed to send message. Please check your connection.');
        }
      );
  };

  const contactItems = [
    { icon: <FaMapMarkerAlt />, title: "Our Location", detail: "Block B, Satellite Town, Rawalpindi", color: "#667eea" },
    { icon: <FaPhoneAlt />, title: "Phone Number", detail: "+92 335 9199919", color: "#20c997" },
    { icon: <FaEnvelope />, title: "Email Address", detail: "atifullahkhan47@gmail.com", color: "#e83e8c" },
  ];

  return (
    <div className="bg-light min-vh-100 overflow-hidden">
      {/* 1. Hero Section with Premium Color/Style */}
      <section className="relative py-5" style={{ backgroundColor: '#f1f2d9', minHeight: '50vh', display: 'flex', alignItems: 'center' }}>
        <div className="container py-5 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-uppercase fw-bold text-muted small tracking-widest d-block mb-3"
            style={{ letterSpacing: '4px' }}
          >
            Connect with us
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="display-3 fw-bold mb-4 text-dark"
          >
            Let's Start a <span style={{ color: '#667eea', fontStyle: 'italic' }}>Conversation</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="lead text-muted mx-auto" style={{ maxWidth: '600px', lineHeight: '1.8' }}
          >
            Have a question, feedback, or just want to explore partnership opportunities? We're all ears and ready to assist you.
          </motion.p>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <div className="container py-5 my-md-4">
        <div className="row g-5">
          {/* Info Cards Side */}
          <motion.div {...fadeInUp} className="col-lg-5">
            <div className="pe-lg-4">
              <h2 className="fw-bold mb-4 display-6">Get In Touch</h2>
              <p className="text-muted mb-5" style={{ lineHeight: '1.8' }}>
                Fill out the form to the right and our dedicated support team will get back to you within 24 business hours. You can also reach us via the details below.
              </p>
              
              <div className="row g-4">
                {contactItems.map((item, index) => (
                  <motion.div 
                    whileHover={{ x: 10 }}
                    key={index} 
                    className="col-12 d-flex align-items-center p-4 rounded-4 bg-white shadow-sm hover-shadow-lg transition-all"
                  >
                    <div className="d-flex align-items-center justify-content-center rounded-circle me-4 text-white shadow-sm" style={{ width: '60px', height: '60px', minWidth: '60px', backgroundColor: item.color, fontSize: '1.5rem' }}>
                      {item.icon}
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">{item.title}</h5>
                      <p className="text-muted mb-0">{item.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-lg-7"
          >
            <div className="card border-0 shadow-lg rounded-5 overflow-hidden p-md-3" style={{ background: '#ffffff' }}>
              <div className="card-body p-4 p-md-5">
                <form ref={formRef} onSubmit={sendEmail}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-muted small text-uppercase tracking-widest">Full Name</label>
                      <input type="text" name="user_name" className="form-control form-control-lg bg-light border-0 px-4 py-3 rounded-4 shadow-none" placeholder="John Doe" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-muted small text-uppercase tracking-widest">Email Address</label>
                      <input type="email" name="user_email" className="form-control form-control-lg bg-light border-0 px-4 py-3 rounded-4 shadow-none" placeholder="john@example.com" required />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold text-muted small text-uppercase tracking-widest">Subject</label>
                      <input type="text" name="subject" className="form-control form-control-lg bg-light border-0 px-4 py-3 rounded-4 shadow-none" placeholder="How can we help?" required />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold text-muted small text-uppercase tracking-widest">Your Message</label>
                      <textarea name="message" rows="5" className="form-control bg-light border-0 px-4 py-3 rounded-4 shadow-none" placeholder="Tell us more about your inquiry..." required></textarea>
                    </div>
                    <div className="col-12 mt-5">
                      <button 
                        type="submit" 
                        disabled={isSending}
                        className={`btn d-flex align-items-center justify-content-center w-100 py-3 rounded-pill fw-bold shadow-sm transition-all text-white ${isSending ? 'opacity-50' : ''}`}
                        style={{ fontSize: '1.1rem', backgroundColor: '#667eea', border: 'none' }}
                      >
                        {isSending ? (
                          <span className="spinner-border spinner-border-sm"></span>
                        ) : (
                          <><FaPaperPlane className="me-2"/> Send Message</>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 4. Support Banner (Premium gradient) */}
      <section className="py-5 mt-4">
        <div className="container py-4">
          <motion.div 
            {...fadeInUp}
            className="text-white rounded-5 p-5 text-center shadow-lg position-relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)' }}
          >
            {/* Background elements */}
            <div className="position-absolute rounded-circle" style={{ width: '200px', height: '200px', background: 'rgba(255,255,255,0.05)', top: '-50px', left: '-50px' }}></div>
            
            <div className="position-relative z-index-1">
              <h2 className="display-6 fw-bold mb-3">Still need immediate help?</h2>
              <p className="text-white-50 mb-4 mx-auto lead" style={{ maxWidth: '650px' }}>
                Our global support team is available 24/7. Average response time is under 15 minutes. Connect with us directly anytime!
              </p>
              <button className="btn btn-light px-5 py-3 rounded-pill fw-bold shadow-sm hover-shadow-lg transition-all text-dark" style={{ fontSize: '1.1rem' }}>
                <RiCustomerService2Fill className="me-2 text-dark" /> Live Chat Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;