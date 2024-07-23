import React from 'react';
import Layout from '../component/layout/Layout';
import img1 from '../images/img5.avif'
import img2 from '../images/img2.avif'
import img3 from '../images/img3.avif'
import img4 from '../images/img.avif'
import img6 from '../images/img7.jpg'

function Home () {
  return (
    <Layout>
      <div id="carouselExampleIndicators" class="carousel slide">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          />
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={img1} class="d-block w-100 " height='500px' alt="..." />
          </div>
          <div class="carousel-item">
            <img src={img2} class="d-block w-100" height='500px' alt="..." />
          </div>
          <div class="carousel-item">
            <img src={img3} class="d-block w-100" height='500px' alt="..." />
          </div>
          <div class="carousel-item">
            <img src={img4} class="d-block w-100" height='500px' alt="..." />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true" />
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true" />
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-md-6 pt-md-5 pt-2">
            <h2 className='fw-bold'>IPhone Feature</h2>
            <p className="lead">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita, ducimus. Officiis incidunt voluptatum, corrupti quod dolores, non qui est voluptatibus ea facere similique eos cum omnis dolorem officia magnam porro amet nobis sint quisquam, Officiis incidunt voluptatum, corrupti quod dolores, non qui est voluptatibus ea facere similique eos cum omnis dolorem officia magnam porro amet nobis sint quisquam, repudiandae quidem ipsam iure quae.</p>
            <button className="btn btn-primary">Read More</button>
          </div>
          <div className="col-md-5 offset-md-1">
            <img src={img6} alt=""  className='w-75' />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
