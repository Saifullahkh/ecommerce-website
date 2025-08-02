import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaPaperPlane } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import emailjs from 'emailjs-com';
import { useRef } from 'react';

const Contact = () => {
   const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_gcy8bbn',     // replace with your actual service ID
        'template_rfydhgh',    // replace with your actual template ID
        formRef.current,
        'dOytzJSEIEs06u6ZD'      // replace with your actual public key
      )
      .then(
        (result) => {
          console.log(result.text);
          alert('✅ Message sent successfully!');
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
          alert('❌ Failed to send message. Try again.');
        }
      );
  };
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="py-5 bg-light ">
        <div className="container py-5 text-center">
          <h1 className="fw-bold display-4 mb-3">Contact Us</h1>
          <p className="fs-4 mb-0" style={{ opacity: 0.9 }}>
            We're here to help and answer any questions you might have
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5 my-4 ">
        <div className="row g-5">
          {/* Contact Info */}
          <div className="col-lg-5">
            <div className="card border-0  h-100">
              <div className="card-body p-4 p-md-5">
                <h3 className="fw-bold mb-4">Get in Touch</h3>
                
                <div className="d-flex mb-4">
                    <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 d-flex align-items-center justify-content-center me-4" style={{ width: '50px', height: '50px' }}>
                        <FaMapMarkerAlt className="fs-5" />
                    </div>
                    <div>
                        <h5 className="fw-semibold mb-1">Our Location</h5>
                        <p className="text-muted mb-0"> Block B, Sattelite Town, Rawalpindi</p>
                    </div>
                </div>

                <div className="d-flex mb-4">
                    <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 d-flex align-items-center justify-content-center me-4" style={{ width: '50px', height: '50px' }}>
                        <FaPhoneAlt className="fs-5" />
                    </div>
                    <div>
                        <h5 className="fw-semibold mb-1">Phone Number</h5>
                        <p className="text-muted mb-0">+92 335 9199919</p>
                    </div>
                </div>

                <div className="d-flex mb-4">
                    <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 d-flex align-items-center justify-content-center me-4" style={{ width: '50px', height: '50px' }}>
                        <FaEnvelope className="fs-5" />
                    </div>
                    <div>
                        <h5 className="fw-semibold mb-1">Email Address</h5>
                        <p className="text-muted mb-0">atifullahkhan47@gmail.com</p>
                    </div>
                </div>

                <div className="d-flex">
                    <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 d-flex align-items-center justify-content-center me-4" style={{ width: '50px', height: '50px' }}>
                        <FaClock className="fs-5" />
                    </div>
                    <div>
                        <h5 className="fw-semibold mb-1">Working Hours</h5>
                        <p className="text-muted mb-0">Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p className="text-muted mb-0">Saturday - Sunday: Closed</p>
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="card border-0 h-100">
              <div className="card-body p-4 p-md-5">
                <h3 className="fw-bold mb-4">Send Us a Message</h3>
                <form ref={formRef} onSubmit={sendEmail}>
      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Your Name</label>
          <input type="text" name="user_name" className="form-control" placeholder="John Doe" required />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Your Email</label>
          <input type="email" name="user_email" className="form-control" placeholder="you@example.com" required />
        </div>
        <div className="col-12">
          <label htmlFor="subject" className="form-label">Subject</label>
          <input type="text" name="subject" className="form-control" placeholder="What do you need?" required />
        </div>
        <div className="col-12">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea name="message" rows="5" className="form-control" placeholder="Write your message..." required></textarea>
        </div>
        <div className="col-12 mt-3">
          <button type="submit" className="btn btn-primary d-flex align-items-center">
            <FaPaperPlane className="me-2" />
            Send Message
          </button>
        </div>
      </div>
    </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Banner */}
      <div className="py-5 bg-light">
        <div className="container text-center py-4">
          <h3 className="fw-bold mb-4">Still Need Help?</h3>
          <p className="fs-5 mb-4 mx-auto" style={{ maxWidth: '700px' }}>
            Our customer support team is available 24/7 to assist you with any questions or concerns.
          </p>
          <button className="btn btn1  px-4 py-2 fw-medium">
            <RiCustomerService2Fill className="me-2" /> Contact Support Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;