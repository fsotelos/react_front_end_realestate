import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropertyApplication from '../application/PropertyApplication';

const Sidebar = () => {
  const [topProperties, setTopProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopProperties = async () => {
      try {
        const properties = await PropertyApplication.loadTopProperties(5);
        setTopProperties(properties);
      } catch (error) {
        console.error('Error loading top properties:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTopProperties();
  }, []);

  return (
    <div className="sidebar">
      <h5 className="mb-3">
        <i className="fas fa-star me-2"></i>
        Top Properties
      </h5>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="list-group list-group-flush">
          {topProperties.map((property) => (
            <Link
              key={property.id}
              to={`/property/${property.id}`}
              className="list-group-item list-group-item-action d-flex align-items-center p-2"
            >
              <img
                src={property.imageUrl}
                alt={property.name}
                className="rounded me-3"
                style={{ width: '50px', height: '40px', objectFit: 'cover' }}
              />
              <div className="flex-grow-1">
                <div className="fw-bold small">{property.name}</div>
                <div className="text-muted small">
                  ${property.price?.toLocaleString()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <hr className="my-3" />

      <h5 className="mb-3">
        <i className="fas fa-info-circle me-2"></i>
        Quick Links
      </h5>

      <ul className="list-unstyled">
        <li className="mb-2">
          <a href="#buy" className="text-decoration-none">
            <i className="fas fa-shopping-cart me-2"></i>
            Buy a Home
          </a>
        </li>
        <li className="mb-2">
          <a href="#sell" className="text-decoration-none">
            <i className="fas fa-dollar-sign me-2"></i>
            Sell Your Home
          </a>
        </li>
        <li className="mb-2">
          <a href="#rent" className="text-decoration-none">
            <i className="fas fa-key me-2"></i>
            Rent a Property
          </a>
        </li>
        <li className="mb-2">
          <a href="#mortgage" className="text-decoration-none">
            <i className="fas fa-calculator me-2"></i>
            Mortgage Calculator
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;