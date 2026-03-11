import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane, FaClock } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import { motion } from "framer-motion";
import emailjs from 'emailjs-com';
import { useRef, useState } from 'react';

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
    { icon: <FaMapMarkerAlt />, title: "Our Location", detail: "Block B, Satellite Town, Rawalpindi", color: "text-primary" },
    { icon: <FaPhoneAlt />, title: "Phone Number", detail: "+92 335 9199919", color: "text-success" },
    { icon: <FaEnvelope />, title: "Email Address", detail: "atifullahkhan47@gmail.com", color: "text-danger" },
    
  ];

  return (
    <div className="bg-white min-vh-100">
      {/* 1. Hero Section with Soft Background */}
      <section className="py-5 text-center" style={{ backgroundColor: '#f1f2d9' }}>
        <div className="container py-5">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-uppercase fw-bold text-muted small tracking-widest d-block mb-2"
          >
            Connect with us
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="display-3 fw-bold mb-3"
          >
            Let's Start a <span className="text-primary-emphasis">Conversation</span>
          </motion.h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Have a question or just want to say hi? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <div className="container py-5">
        <div className="row g-5">
          {/* Info Cards Side */}
          <div className="col-lg-5">
            <div className="pe-lg-4">
              <h2 className="fw-bold mb-4">Contact Information</h2>
              <p className="text-muted mb-5">Fill out the form and our team will get back to you within 24 hours.</p>
              
              <div className="row g-4">
                {contactItems.map((item, index) => (
                  <motion.div 
                    whileHover={{ x: 10 }}
                    key={index} 
                    className="col-12 d-flex align-items-start p-3 rounded-4 bg-light border-0 transition-all"
                  >
                    <div className={`me-3 ${item.color}`} style={{ width: '55px', height: '55px', minWidth: '55px' }}>
                      {item.icon}
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">{item.title}</h6>
                      <p className="text-muted small mb-0">{item.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form Side */}
          <div className="col-lg-7">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="card border-0 shadow-lg rounded-5 overflow-hidden"
            >
              <div className="card-body p-4 p-md-5">
                <form ref={formRef} onSubmit={sendEmail}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label fw-bold small">Full Name</label>
                      <input type="text" name="user_name" className="form-control form-control-lg bg-light border-0 px-4 py-3 rounded-3" placeholder="John Doe" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold small">Email Address</label>
                      <input type="email" name="user_email" className="form-control form-control-lg bg-light border-0 px-4 py-3 rounded-3" placeholder="john@example.com" required />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold small">Subject</label>
                      <input type="text" name="subject" className="form-control form-control-lg bg-light border-0 px-4 py-3 rounded-3" placeholder="How can we help?" required />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold small">Your Message</label>
                      <textarea name="message" rows="5" className="form-control bg-light border-0 px-4 py-3 rounded-3" placeholder="Tell us more about your inquiry..." required></textarea>
                    </div>
                    <div className="col-12">
                      <button 
                        type="submit" 
                        disabled={isSending}
                        className={`btn btn-dark w-100 py-3 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2 transition-all ${isSending ? 'opacity-50' : ''}`}
                      >
                        {isSending ? (
                          <span className="spinner-border spinner-border-sm"></span>
                        ) : (
                          <><FaPaperPlane /> Send Message</>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3. Interactive Map (Placeholder for Professionalism) */}
      <div className="container-fluid px-0 pt-5">
        <div className="ratio ratio-21x9 grayscale-filter">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13289.04940562548!2d73.0645!3d33.6401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df94916a9a7a13%3A0xc3f7a7f4575f0a8c!2sSatellite%20Town%2C%20Rawalpindi!5e0!3m2!1sen!2spk!4v1700000000000" 
            allowFullScreen="" loading="lazy">
          </iframe>
        </div>
      </div>

      {/* 4. Support Banner */}
      <section className="py-5 border-top">
        <div className="container py-5">
          <div className="bg-dark text-white rounded-5 p-5 text-center shadow-2xl position-relative overflow-hidden">
            <div className="position-relative z-index-1">
              <h2 className="fw-bold mb-3">Still need immediate help?</h2>
              <p className="text-white-50 mb-4 mx-auto" style={{ maxWidth: '600px' }}>
                Our global support team is available 24/7. Average response time is under 15 minutes.
              </p>
              <button className="btn btn-light px-5 py-3 rounded-pill fw-bold">
                <RiCustomerService2Fill className="me-2" /> Live Chat Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;