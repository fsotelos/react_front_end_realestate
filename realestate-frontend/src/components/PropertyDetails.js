import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropertyApplication from '../application/PropertyApplication';
import Map from './Map';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const data = await PropertyApplication.loadPropertyDetails(id);
        setProperty(data);
      } catch (err) {
        setError('Failed to load property details');
        console.error('Error fetching property:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Link to="/" className="btn btn-primary">
          Back to Properties
        </Link>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning" role="alert">
          Property not found
        </div>
        <Link to="/" className="btn btn-primary">
          Back to Properties
        </Link>
      </div>
    );
  }

  const formattedProperty = PropertyApplication.formatPropertyData(property);

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-secondary mb-3">
        ← Back to Properties
      </Link>

      <div className="row">
        <div className="col-lg-8">
          <img
            src={formattedProperty.imageUrl || `https://picsum.photos/800/400?random=${property.id}`}
            className="img-fluid rounded mb-4"
            alt={property.name}
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = `https://picsum.photos/800/400?random=${property.id}`;
            }}
          />

          <h1 className="mb-3">{property.name}</h1>
          <p className="text-muted mb-3">
            <i className="fas fa-map-marker-alt me-1"></i>
            {formattedProperty.formattedAddress}
          </p>
          <p className="h4 text-primary mb-4">
            {formattedProperty.formattedPrice}
          </p>

          <div className="mb-4">
            <h3>Description</h3>
            <p>{property.description}</p>
          </div>

          {property.bedrooms && property.bathrooms && (
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">
                      <i className="fas fa-bed me-2"></i>
                      {property.bedrooms}
                    </h5>
                    <p className="card-text">Bedrooms</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">
                      <i className="fas fa-bath me-2"></i>
                      {property.bathrooms}
                    </h5>
                    <p className="card-text">Bathrooms</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mb-4">
            <h3>Location</h3>
            <Map address={property.address} />
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Property Summary</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Price:</strong> {formattedProperty.formattedPrice}
                </li>
                <li className="list-group-item">
                  <strong>Address:</strong> {formattedProperty.formattedAddress}
                </li>
                {property.bedrooms && (
                  <li className="list-group-item">
                    <strong>Bedrooms:</strong> {property.bedrooms}
                  </li>
                )}
                {property.bathrooms && (
                  <li className="list-group-item">
                    <strong>Bathrooms:</strong> {property.bathrooms}
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Contact Agent</h5>
              <p className="text-muted small mb-3">
                Interested in this property? Get in touch with our agent.
              </p>
              <button className="btn btn-primary w-100 mb-2">
                <i className="fas fa-phone me-2"></i>
                Call Now
              </button>
              <button className="btn btn-outline-primary w-100">
                <i className="fas fa-envelope me-2"></i>
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;