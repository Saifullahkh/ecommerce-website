// Footer.jsx
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import logo from '../assets/logo5.png'

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 ">
      <div className="container">
        <div className="row">
          {/* Column 1: About */}
          <div className="col-md-4 mb-4">
             <img src={logo} height='60px' className='mb-3'/>
            <p className="">
              Quality products, great prices. Shop your favorite categories anytime, anywhere.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-md-4 mb-4">
            <h6 className="text-uppercase mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/cart" className="text-light text-decoration-none">Cart</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact Us</a></li>
              <li><a href="/policy" className="text-light text-decoration-none">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="col-md-4 mb-4">
            <h6 className="text-uppercase mb-3">Contact</h6>
            <p className="mb-1">
              <FaMapMarkerAlt className="me-2" />
              Block B, Sattelite Town, Rawalpindi
            </p>
            <p className="mb-1">
              <FaPhoneAlt className="me-2" />
              +92 335 9199919
            </p>
            <p>
              <FaEnvelope className="me-2" />
              atifullahkhan47@gmail.com
            </p>
          </div>
        </div>

        <hr className="border-light" />

        <div className="text-center small">
          &copy; {new Date().getFullYear()} OnlineStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
