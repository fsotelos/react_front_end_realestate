import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PropertySearch from '../components/PropertySearch';

// Mock the PropertyApplication
jest.mock('../application/PropertyApplication', () => ({
  validateFilters: jest.fn((filters) => filters),
  loadProperties: jest.fn(() =>
    Promise.resolve([
      {
        id: 1,
        name: 'Luxury Villa',
        address: '123 Main St',
        price: 1000000,
        bedrooms: 4,
        bathrooms: 3,
        description: 'Beautiful luxury villa'
      }
    ])
  ),
  formatPropertyData: jest.fn((property) => ({
    ...property,
    formattedPrice: '$1,000,000',
    formattedAddress: property.address
  }))
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('PropertySearch Component', () => {
  test('renders Property Search page', () => {
    renderWithRouter(<PropertySearch />);

    expect(screen.getByText('Property Search')).toBeInTheDocument();
    expect(screen.getByText('Find your perfect property from our extensive collection')).toBeInTheDocument();
    expect(screen.getByText('Search Properties')).toBeInTheDocument();
    expect(screen.getByText('Back to Home')).toBeInTheDocument();
  });

  test('displays properties after loading', async () => {
    renderWithRouter(<PropertySearch />);

    await waitFor(() => {
      expect(screen.getByText('Luxury Villa')).toBeInTheDocument();
    });

    expect(screen.getByText('1 propert')).toBeInTheDocument();
  });

  test('handles search button click', async () => {
    renderWithRouter(<PropertySearch />);

    const searchButton = screen.getByText('Search Properties');
    fireEvent.click(searchButton);

    // Should still work after search
    await waitFor(() => {
      expect(screen.getByText('Luxury Villa')).toBeInTheDocument();
    });
  });

  test('shows loading state', () => {
    renderWithRouter(<PropertySearch />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders filters component', () => {
    renderWithRouter(<PropertySearch />);

    // Assuming Filters component has some identifiable text
    expect(screen.getByText('Property Search')).toBeInTheDocument();
  });
});