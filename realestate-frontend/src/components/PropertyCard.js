import React from 'react';
import { Link } from 'react-router-dom';
import PropertyApplication from '../application/PropertyApplication';

const PropertyCard = ({ property }) => {
  const formattedProperty = PropertyApplication.formatPropertyData(property);

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 property-card">
        <img
          src={formattedProperty.imageUrl || `https://picsum.photos/400/300?random=${property.id}`}
          className="card-img-top"
          alt={property.name}
          style={{ height: '200px', objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = `https://picsum.photos/400/300?random=${property.id}`;
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{property.name}</h5>
          <p className="card-text text-muted">
            <i className="fas fa-map-marker-alt me-1"></i>
            {formattedProperty.formattedAddress}
          </p>
          <p className="card-text fw-bold text-primary fs-5">
            {formattedProperty.formattedPrice}
          </p>
          <p className="card-text flex-grow-1">{property.description}</p>
          <div className="d-flex justify-content-between align-items-center mt-auto">
            {property.bedrooms && property.bathrooms && (
              <small className="text-muted">
                <i className="fas fa-bed me-1"></i>{property.bedrooms} beds
                <i className="fas fa-bath ms-2 me-1"></i>{property.bathrooms} baths
              </small>
            )}
            <Link
              to={`/property/${property.id}`}
              className="btn btn-primary btn-sm"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;