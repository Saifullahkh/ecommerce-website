import React from 'react';
import '../../App.css'

function Footer () {
  return (
    <div class="container-fluid footer">
      <footer class="row  py-5 ">
        <div class="col-md-4 mb-2 px-md-5">
          <h3 className='fw-bold'>APPLE MART</h3>
          <p class="text-white">Copyright Saif ullah© 2024</p>
        </div>

        <div class="col-md-2 mb-2">
          <h5>Company</h5>
          <ul class="nav flex-column ">
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-white text-white">Home</a>
            </li>
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-white">Product</a>
            </li>
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-white">About</a>
            </li>
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-white">Contact</a>
            </li>
          </ul>
        </div>

        <div class="col-md-2 mb-2">
          <h5>Support</h5>
          <ul class="nav flex-column">
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-white">Help center</a>
            </li>
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-white">Term of services</a>
            </li>
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-white">Pravicy policy</a>
            </li>
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-white">Legal</a>
            </li>
          </ul>
        </div>

        <div class="col-md-4  mb-2">
        <form>
          <h5>Subscribe to our newsletter</h5>
          <p>Monthly digest of what's new and exciting from us.</p>
          <div class="d-flex flex-column flex-sm-row w-100 gap-2">
            <label for="newsletter1" class="visually-hidden">Email address</label>
            <input id="newsletter1" type="text" class="form-control" placeholder="Email address" />
            <button class="btn btn-primary" type="button">Subscribe</button>
          </div>
        </form>
      </div>
      </footer>
    </div>
  );
}

export default Footer;
