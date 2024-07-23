import React from 'react';
import Layout from '../component/layout/Layout';
import Contact1 from '../images/contact.jpg';

function Contact () {
  return (
    <Layout>
      <div className="container my-5">
        <div className="row my-2">
          <div className="col-12 text-center">
            <h1>Have Some Question?</h1>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <img src={Contact1} alt="" width='300px' height='300px' />
          </div>
          <div className="col-md-6 mt-3">
            <form>
              <div class="mb-3">
                <label for="exampleFormControl" class="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControl"
                  placeholder="Enter Name"
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter Email"
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">
                  Message
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                /> 
              </div>
              <button className="btn btn-outline-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
