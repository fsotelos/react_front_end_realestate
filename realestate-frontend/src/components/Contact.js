import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="text-center mb-5">
          <h2>Get In Touch</h2>
          <p className="subtitle">
            Ready to find your dream property? Contact our expert team today for personalized assistance
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="contact-form">
              {submitted && (
                <div className="alert alert-success" role="alert">
                  <i className="fas fa-check-circle me-2"></i>
                  Thank you for your message! We'll get back to you within 24 hours.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label htmlFor="name" className="form-label fw-semibold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="form-label fw-semibold">
                    Message *
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your property requirements or questions..."
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane me-2"></i>
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-4 text-center mb-4">
            <div className="mb-3">
              <i className="fas fa-phone text-warning fs-2"></i>
            </div>
            <h5>Call Us</h5>
            <p className="text-muted mb-0">
              {process.env.REACT_APP_COMPANY_PHONE || '+1 (555) 123-4567'}
            </p>
          </div>
          <div className="col-md-4 text-center mb-4">
            <div className="mb-3">
              <i className="fas fa-envelope text-warning fs-2"></i>
            </div>
            <h5>Email Us</h5>
            <p className="text-muted mb-0">
              {process.env.REACT_APP_COMPANY_EMAIL || 'info@luxuryestates.com'}
            </p>
          </div>
          <div className="col-md-4 text-center mb-4">
            <div className="mb-3">
              <i className="fas fa-map-marker-alt text-warning fs-2"></i>
            </div>
            <h5>Visit Us</h5>
            <p className="text-muted mb-0">
              {process.env.REACT_APP_COMPANY_ADDRESS || '123 Luxury Ave, Prime City, PC 12345'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;