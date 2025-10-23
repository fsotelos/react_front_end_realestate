import React from 'react';

const AboutUs = () => {
  return (
    <section id="about" className="about-us">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h2>About Luxury Estates</h2>
            <p>
              With over two decades of experience in the luxury real estate market, Luxury Estates has established
              itself as the premier destination for discerning property buyers and investors. Our commitment to
              excellence, personalized service, and deep market knowledge sets us apart in the competitive world
              of high-end real estate.
            </p>
            <p>
              We specialize in connecting our clients with exceptional properties that not only meet their practical
              needs but also reflect their unique lifestyle aspirations. From waterfront villas to penthouse
              apartments in prime locations, our portfolio represents the finest in luxury living.
            </p>
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-award text-warning me-3 fs-4"></i>
                  <div>
                    <h5 className="mb-0">Award Winning</h5>
                    <small className="text-muted">Recognized for excellence</small>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-users text-warning me-3 fs-4"></i>
                  <div>
                    <h5 className="mb-0">Expert Team</h5>
                    <small className="text-muted">20+ years experience</small>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-home text-warning me-3 fs-4"></i>
                  <div>
                    <h5 className="mb-0">Premium Properties</h5>
                    <small className="text-muted">Curated selection</small>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-handshake text-warning me-3 fs-4"></i>
                  <div>
                    <h5 className="mb-0">Trusted Service</h5>
                    <small className="text-muted">Client satisfaction</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-5 mt-lg-0">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Luxury real estate team meeting"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;