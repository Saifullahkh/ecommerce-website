import React from 'react'
import Layout from '../component/layout/Layout'
import {NavLink} from 'react-router-dom'
import About1 from '../images/about.png'

function About() {
  return (
    <Layout>
      <div className="container py-5 my-3">
        <div className="row">
          <div className="col-md-6">
            <h2 className='fw-bold text-primary mb-2'>About Us</h2>
            <p className="lead text-justify">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti fuga labore dolorum voluptatibus amet suscipit doloribus! Molestiae harum dicta officia quibusdam modi natus sunt nostrum, quas nulla fugiat optio voluptatem? Magnam quas aperiam, dolorem porro ipsam perspiciatis ad ea, quasi assumenda repudiandae autem eveniet sequi molestias itaque doloremque ducimus, a consequuntur omnis vel! Impedit nemo ab sint veritatis explicabo dolores voluptatem consectetur dicta neque laboriosam doloremque quidem voluptatum, illo voluptates nam. Eius accusantium maiores neque quam dolorum architecto impedit, obcaecati quae culpa libero itaque amet molestias corrupti quod dignissimos illum id totam, aperiam quibusdam commodi repellendus repellat ea sed. Officiis.
            </p>
            <NavLink to={'/contact'}>
              <div className="btn btn-outline-primary px-2">
                Contact Us
              </div>
            </NavLink>
          </div>
          <div className="col-md-6 mt-5 d-flex justify-content-center ">
            <img src={About1} alt="" />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default About
