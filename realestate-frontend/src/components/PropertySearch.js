import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropertyApplication from '../application/PropertyApplication';
import PropertyCard from './PropertyCard';
import Filters from './Filters';

const PropertySearch = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const itemsPerPage = 10; // Display 10 items per page for better UX

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch all properties (no pagination from server)
      const response = await PropertyApplication.loadProperties({ pageSize: 100 });

      // Handle both array response and paginated response
      let data = [];
      if (Array.isArray(response)) {
        data = response;
      } else if (response && typeof response === 'object') {
        data = response.properties || response.data || [];
      }

      setAllProperties(data);
      setFilteredProperties(data);
      setTotalResults(data.length);
      setCurrentPage(1);
    } catch (err) {
      setError('Failed to load properties');
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);


  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Don't apply filters immediately - wait for search button click to call API
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      // Clear previous results immediately to ensure UI updates
      setAllProperties([]);
      setFilteredProperties([]);
      setTotalResults(0);

      // ENSURE ALL FILTERS ARE SENT - even if empty/undefined
      // The backend should handle filtering logic, not the frontend
      const allFiltersToSend = {
        name: filters.name || '',
        address: filters.address || '',
        minPrice: filters.minPrice || '',
        maxPrice: filters.maxPrice || '',
        page: 1,
        pageSize: 100 // Load more properties for client-side pagination
      };

      console.log('CURRENT filters state:', filters); // Debug log
      console.log('ALL filters being sent to API (ensuring all params):', allFiltersToSend); // Debug log

      // Call API with ALL filters - backend handles the filtering
      const response = await PropertyApplication.loadProperties(allFiltersToSend);

      console.log('Raw API Response:', response); // Debug log

      // Handle both array response and paginated response
      let data = [];
      if (Array.isArray(response)) {
        data = response;
      } else if (response && typeof response === 'object') {
        data = response.properties || response.data || [];
      }

      console.log('Final processed data array:', data); // Debug log
      console.log('Number of properties returned:', data.length); // Debug log

      // Force state updates
      setAllProperties([...data]);
      setFilteredProperties([...data]);
      setTotalResults(data.length);
      setCurrentPage(1);

      // Additional verification
      if (data.length === 0) {
        console.warn('No properties returned from API. Check if filters are too restrictive.');
      } else {
        console.log('Search completed successfully with', data.length, 'properties');
      }

    } catch (err) {
      setError('Failed to search properties');
      console.error('Error searching properties:', err);
      // Reset to empty state on error
      setAllProperties([]);
      setFilteredProperties([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = async (clearedFilters) => {
    try {
      setLoading(true);
      setError(null);

      // Clear previous results immediately
      setAllProperties([]);
      setFilteredProperties([]);
      setTotalResults(0);

      setFilters(clearedFilters);

      console.log('Clearing filters and reloading all properties'); // Debug log

      // Call API without filters to get all properties
      const response = await PropertyApplication.loadProperties({
        pageSize: 100 // Load more properties for client-side pagination
      });

      console.log('Clear filters API Response:', response); // Debug log

      // Handle both array response and paginated response
      let data = [];
      if (Array.isArray(response)) {
        data = response;
      } else if (response && typeof response === 'object') {
        data = response.properties || response.data || [];
      }

      console.log('Clear filters processed data:', data.length, 'properties'); // Debug log

      // Force state updates
      setAllProperties([...data]);
      setFilteredProperties([...data]);
      setTotalResults(data.length);
      setCurrentPage(1);

      console.log('Clear filters completed successfully');

    } catch (err) {
      setError('Failed to load properties');
      console.error('Error loading properties:', err);
      // Reset to empty state on error
      setAllProperties([]);
      setFilteredProperties([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };


  // Calculate pagination
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);

  return (
    <div className="search-page">
      {/* Search Interface */}
      <div className="container-fluid py-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h1 className="search-title mb-2">Advanced Property Search</h1>
                  <p className="search-subtitle mb-0">
                    Find your perfect property with our comprehensive search tools and filters
                  </p>
                </div>
                <Link to="/" className="btn btn-outline-primary">
                  <i className="fas fa-home me-2"></i>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="search-interface bg-light p-4 rounded shadow mb-4">
              <h3 className="mb-4">
                <i className="fas fa-sliders-h text-primary me-2"></i>
                Refine Your Search
              </h3>
              <Filters
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                onClear={handleClearFilters}
                loading={loading}
                totalResults={totalResults}
              />

            </div>

            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Searching properties...</p>
              </div>
            )}

            {error && (
              <div className="alert alert-danger" role="alert">
                <i className="fas fa-exclamation-triangle me-2"></i>
                {error}
              </div>
            )}

            {!loading && !error && (
              <>
                {filteredProperties.length === 0 ? (
                  <div className="text-center py-5">
                    <div className="empty-search">
                      <i className="fas fa-search fa-4x mb-4 text-muted"></i>
                      <h4>No properties found</h4>
                      <p className="text-muted mb-4">Try adjusting your search criteria or clearing filters</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setFilters({});
                          setFilteredProperties(allProperties);
                          setTotalResults(allProperties.length);
                          setCurrentPage(1);
                        }}
                      >
                        <i className="fas fa-refresh me-2"></i>
                        Reset Search
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="search-results-header d-flex justify-content-between align-items-center mb-4">
                      <h4 className="mb-0">
                        Search Results ({totalResults} properties)
                      </h4>
                      <div className="view-options">
                        <small className="text-muted">Page {currentPage} of {totalPages}</small>
                      </div>
                    </div>

                    <div className="row">
                      {currentProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <nav aria-label="Property pagination" className="mt-5">
                        <div className="d-flex justify-content-center align-items-center">
                          {/* Previous Button */}
                          <button
                            className={`btn btn-outline-primary me-3 ${currentPage === 1 ? 'disabled' : ''}`}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            style={{
                              borderRadius: '50px',
                              padding: '0.5rem 1rem',
                              fontWeight: '600',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <i className="fas fa-chevron-left me-1"></i>
                            Previous
                          </button>

                          {/* Page Numbers */}
                          <div className="d-flex align-items-center mx-3">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                              <button
                                key={page}
                                className={`btn mx-1 ${
                                  page === currentPage
                                    ? 'btn-primary'
                                    : 'btn-outline-primary'
                                }`}
                                onClick={() => handlePageChange(page)}
                                style={{
                                  borderRadius: '50%',
                                  width: '45px',
                                  height: '45px',
                                  padding: '0',
                                  fontWeight: '600',
                                  fontSize: '1rem',
                                  transition: 'all 0.3s ease',
                                  boxShadow: page === currentPage ? '0 4px 15px rgba(0, 123, 255, 0.3)' : 'none'
                                }}
                              >
                                {page}
                              </button>
                            ))}
                          </div>

                          {/* Next Button */}
                          <button
                            className={`btn btn-outline-primary ms-3 ${currentPage === totalPages ? 'disabled' : ''}`}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            style={{
                              borderRadius: '50px',
                              padding: '0.5rem 1rem',
                              fontWeight: '600',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            Next
                            <i className="fas fa-chevron-right ms-1"></i>
                          </button>
                        </div>

                        {/* Page Info */}
                        <div className="text-center mt-3">
                          <small className="text-muted">
                            Showing {startIndex + 1}-{Math.min(endIndex, totalResults)} of {totalResults} properties
                          </small>
                        </div>
                      </nav>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySearch;