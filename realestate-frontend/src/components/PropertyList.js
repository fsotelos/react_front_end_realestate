import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropertyApplication from '../application/PropertyApplication';
import PropertyCard from './PropertyCard';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch top 10 properties for home page display
        const data = await PropertyApplication.loadProperties({ pageSize: 10, page: 1 });
        setProperties(data.slice(0, 10)); // Ensure only top 10
      } catch (err) {
        setError('Failed to load properties');
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopProperties();
  }, []);

  return (
    <section id="properties" className="featured-properties">
      <div className="container">
        <div className="text-center mb-5">
          <h2>Featured Properties</h2>
          <p className="subtitle">
            Discover our handpicked selection of premium properties that represent the finest in luxury real estate
          </p>
          <Link to="/search" className="btn btn-warning btn-lg mt-3">
            <i className="fas fa-search me-2"></i>
            Search All Properties
          </Link>
        </div>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-4">
              <p className="text-muted text-center">
                Showing our top {properties.length} featured propert{properties.length !== 1 ? 'ies' : 'y'}
              </p>
            </div>

            {properties.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted">No properties available at the moment.</p>
              </div>
            ) : (
              <div className="row">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default PropertyList;