import React, { useState, useEffect } from 'react';

const Filters = ({ onFilterChange, onSearch, onClear, loading, totalResults }) => {
  const [filters, setFilters] = useState({
    name: '',
    address: '',
    minPrice: '',
    maxPrice: '',
    page: 1,
    pageSize: 10,
  });

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 10000000, // 10 million as default max
  });

  // Smart price range calculation
  useEffect(() => {
    // This would typically come from an API call to get min/max prices
    // For now, we'll set reasonable defaults
    setPriceRange({
      min: 100000,   // $100K
      max: 5000000,  // $5M
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    console.log('Filter input changed:', name, '=', value); // Debug log
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      name: '',
      address: '',
      minPrice: '',
      maxPrice: '',
      page: 1,
      pageSize: 10,
    };
    setFilters(clearedFilters);
    onClear(clearedFilters);
  };

  const getPriceSuggestions = () => {
    return [
      { label: 'Under $500K', min: 0, max: 500000 },
      { label: '$500K - $1M', min: 500000, max: 1000000 },
      { label: '$1M - $2M', min: 1000000, max: 2000000 },
      { label: '$2M - $5M', min: 2000000, max: 5000000 },
      { label: 'Over $5M', min: 5000000, max: 10000000 },
    ];
  };

  const applyPriceSuggestion = (suggestion) => {
    const newFilters = {
      ...filters,
      minPrice: suggestion.min.toString(),
      maxPrice: suggestion.max.toString(),
    };
    setFilters(newFilters);
    console.log('Quick price suggestion applied:', suggestion.label, '-> min:', suggestion.min, 'max:', suggestion.max); // Debug log
    onFilterChange(newFilters);
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">Search & Filter Properties</h5>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">Property Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={filters.name}
              onChange={handleInputChange}
              placeholder="Enter property name"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={filters.address}
              onChange={handleInputChange}
              placeholder="Enter address"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="minPrice" className="form-label">Min Price</label>
            <input
              type="number"
              className="form-control"
              id="minPrice"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleInputChange}
              placeholder={`Min: $${priceRange.min.toLocaleString()}`}
              min={priceRange.min}
              max={priceRange.max}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="maxPrice" className="form-label">Max Price</label>
            <input
              type="number"
              className="form-control"
              id="maxPrice"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleInputChange}
              placeholder={`Max: $${priceRange.max.toLocaleString()}`}
              min={priceRange.min}
              max={priceRange.max}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Quick Price Ranges</label>
            <div className="d-flex flex-wrap gap-2">
              {getPriceSuggestions().map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => applyPriceSuggestion(suggestion)}
                  style={{ fontSize: '0.875rem' }}
                >
                  {suggestion.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-warning btn-lg me-3"
              onClick={onSearch}
              disabled={loading}
            >
              <i className="fas fa-search me-2"></i>
              Search Properties
            </button>
            <div className="search-results-info">
              <h5 className="mb-0 text-primary">{totalResults}</h5>
              <small className="text-muted">Properties Found</small>
            </div>
          </div>
          <div className="search-actions">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleClearFilters}
            >
              <i className="fas fa-times me-1"></i>
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;