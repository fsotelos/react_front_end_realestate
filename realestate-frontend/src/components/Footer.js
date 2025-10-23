import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 mb-4">
            <h5 className="mb-3">
              <i className="fas fa-home me-2"></i>
              {process.env.REACT_APP_COMPANY_NAME || 'Luxury Estates'}
            </h5>
            <p className="text-muted">
              Your premier destination for luxury real estate. We specialize in connecting discerning clients
              with exceptional properties that define sophisticated living.
            </p>
            <div className="social-links mt-3">
              <a href="#" className="text-muted me-3" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-muted me-3" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-muted me-3" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-muted" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-3 mb-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <button
                  className="btn btn-link text-muted p-0 text-decoration-none"
                  onClick={() => scrollToSection('properties')}
                >
                  <i className="fas fa-search me-2"></i>
                  Properties
                </button>
              </li>
              <li className="mb-2">
                <button
                  className="btn btn-link text-muted p-0 text-decoration-none"
                  onClick={() => scrollToSection('about')}
                >
                  <i className="fas fa-info-circle me-2"></i>
                  About Us
                </button>
              </li>
              <li className="mb-2">
                <button
                  className="btn btn-link text-muted p-0 text-decoration-none"
                  onClick={() => scrollToSection('contact')}
                >
                  <i className="fas fa-envelope me-2"></i>
                  Contact
                </button>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">
                  <i className="fas fa-file-alt me-2"></i>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 mb-4">
            <h5 className="mb-3">Services</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">
                  <i className="fas fa-home me-2"></i>
                  Property Sales
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">
                  <i className="fas fa-key me-2"></i>
                  Property Rentals
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">
                  <i className="fas fa-chart-line me-2"></i>
                  Investment Consulting
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">
                  <i className="fas fa-handshake me-2"></i>
                  Property Management
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 mb-4">
            <h5 className="mb-3">
              <i className="fas fa-clock me-2"></i>
              Business Hours
            </h5>
            <ul className="list-unstyled">
              <li className="mb-1">Monday - Friday: 9:00 AM - 7:00 PM</li>
              <li className="mb-1">Saturday: 10:00 AM - 5:00 PM</li>
              <li className="mb-1">Sunday: By Appointment</li>
            </ul>
            <div className="mt-3">
              <button
                className="btn btn-outline-light btn-sm"
                onClick={() => scrollToSection('contact')}
              >
                <i className="fas fa-calendar me-1"></i>
                Schedule Viewing
              </button>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0 text-muted">
              © {currentYear} {process.env.REACT_APP_COMPANY_NAME || 'Luxury Estates'}.
              All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0 text-muted small">
              Designed with excellence for luxury living
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;