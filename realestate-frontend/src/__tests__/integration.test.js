import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from '../App';

// Mock the Map component to avoid Leaflet issues in tests
jest.mock('../components/Map', () => {
  return function MockMap() {
    return <div data-testid="map">Map</div>;
  };
});

describe('Integration Tests - Full Application Flow', () => {
  let mock;
  let user;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    user = userEvent.setup();

    // Mock default API responses
    mock.onGet('/properties').reply(200, [
      {
        id: 1,
        name: 'Beautiful Villa',
        address: '123 Main St, City, State',
        price: 250000,
        description: 'A lovely family home',
        bedrooms: 3,
        bathrooms: 2
      },
      {
        id: 2,
        name: 'Modern Apartment',
        address: '456 Oak Ave, City, State',
        price: 180000,
        description: 'Contemporary living space',
        bedrooms: 2,
        bathrooms: 1
      }
    ]);

    mock.onGet('/properties/1').reply(200, {
      id: 1,
      name: 'Beautiful Villa',
      address: '123 Main St, City, State',
      price: 250000,
      description: 'A lovely family home with great amenities',
      bedrooms: 3,
      bathrooms: 2
    });
  });

  afterEach(() => {
    mock.restore();
  });

  test('complete user journey: browse properties -> filter -> view details', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Wait for properties to load
    await waitFor(() => {
      expect(screen.getByText('Beautiful Villa')).toBeInTheDocument();
    });

    // Verify properties are displayed
    expect(screen.getByText('Modern Apartment')).toBeInTheDocument();
    expect(screen.getByText('Showing 2 properties')).toBeInTheDocument();

    // Test filtering
    const nameFilter = screen.getByLabelText(/property name/i);
    await user.type(nameFilter, 'Villa');

    // Wait for filter to apply
    await waitFor(() => {
      expect(screen.getByText('Showing 1 propert')).toBeInTheDocument();
    });

    // Only Villa should be visible
    expect(screen.getByText('Beautiful Villa')).toBeInTheDocument();
    expect(screen.queryByText('Modern Apartment')).not.toBeInTheDocument();

    // Click on property to view details
    const viewDetailsButton = screen.getByRole('link', { name: /view details/i });
    await user.click(viewDetailsButton);

    // Verify we're on the property details page
    await waitFor(() => {
      expect(screen.getByText('Beautiful Villa')).toBeInTheDocument();
    });

    expect(screen.getByText('$250,000')).toBeInTheDocument();
    expect(screen.getByText('123 Main St, City, State')).toBeInTheDocument();
    expect(screen.getByText('A lovely family home with great amenities')).toBeInTheDocument();

    // Test back navigation
    const backButton = screen.getByRole('link', { name: /back to properties/i });
    await user.click(backButton);

    // Should be back to property list
    await waitFor(() => {
      expect(screen.getByText('Property Listings')).toBeInTheDocument();
    });
  });

  test('handles API errors gracefully', async () => {
    // Mock API error
    mock.onGet('/properties').reply(500, { error: 'Server error' });

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Should show error message
    await waitFor(() => {
      expect(screen.getByText('Failed to load properties')).toBeInTheDocument();
    });

    // Should not show properties
    expect(screen.queryByText('Beautiful Villa')).not.toBeInTheDocument();
  });

  test('handles empty results', async () => {
    mock.onGet('/properties').reply(200, []);

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No properties found matching your criteria.')).toBeInTheDocument();
    });
  });

  test('price filtering works end-to-end', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Beautiful Villa')).toBeInTheDocument();
    });

    // Set minimum price filter
    const minPriceInput = screen.getByLabelText(/min price/i);
    await user.type(minPriceInput, '200000');

    // Wait for filter to apply
    await waitFor(() => {
      expect(screen.getByText('Showing 1 propert')).toBeInTheDocument();
    });

    // Only the more expensive property should be visible
    expect(screen.getByText('Beautiful Villa')).toBeInTheDocument();
    expect(screen.queryByText('Modern Apartment')).not.toBeInTheDocument();
  });

  test('clear filters functionality', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Beautiful Villa')).toBeInTheDocument();
    });

    // Apply a filter
    const nameFilter = screen.getByLabelText(/property name/i);
    await user.type(nameFilter, 'Villa');

    await waitFor(() => {
      expect(screen.getByText('Showing 1 propert')).toBeInTheDocument();
    });

    // Clear filters
    const clearButton = screen.getByRole('button', { name: /clear filters/i });
    await user.click(clearButton);

    // Should show all properties again
    await waitFor(() => {
      expect(screen.getByText('Showing 2 properties')).toBeInTheDocument();
    });

    expect(screen.getByText('Beautiful Villa')).toBeInTheDocument();
    expect(screen.getByText('Modern Apartment')).toBeInTheDocument();
  });
});