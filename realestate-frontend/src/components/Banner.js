import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-7">
            <h1>Find Your Dream Luxury Home</h1>
            <p>
              Discover exceptional properties in prime locations. From elegant apartments to stunning villas,
              we connect you with the finest real estate opportunities that match your lifestyle and aspirations.
            </p>
            <Link to="/search" className="btn btn-hero btn-lg mt-3">
              <i className="fas fa-search me-2"></i>
              View Properties
            </Link>
          </div>
          <div className="col-lg-5 mt-5 mt-lg-0">
            <div className="row g-4">
              <div className="col-6">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                  alt="Luxury Modern House"
                  className="img-fluid rounded shadow"
                />
              </div>
              <div className="col-6">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                  alt="Elegant Apartment"
                  className="img-fluid rounded shadow"
                  style={{ marginTop: '2rem' }}
                />
              </div>
              <div className="col-6">
                <img
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                  alt="Modern Villa"
                  className="img-fluid rounded shadow"
                  style={{ marginTop: '1rem' }}
                />
              </div>
              <div className="col-6">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                  alt="Luxury Interior"
                  className="img-fluid rounded shadow"
                  style={{ marginTop: '3rem' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;