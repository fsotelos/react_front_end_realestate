import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import PropertyCard from '../components/PropertyCard';
import PropertyApplication from '../application/PropertyApplication';

// Mock PropertyApplication
jest.mock('../application/PropertyApplication');

const mockProperty = {
  id: 1,
  name: 'Beautiful House',
  address: '123 Main St, City, State',
  price: 250000,
  description: 'A lovely family home',
  bedrooms: 3,
  bathrooms: 2,
  imageUrl: 'https://example.com/image.jpg'
};

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('PropertyCard', () => {
  beforeEach(() => {
    PropertyApplication.formatPropertyData.mockReturnValue({
      ...mockProperty,
      formattedPrice: '$250,000',
      formattedAddress: mockProperty.address
    });
  });

  test('renders property information correctly', () => {
    renderWithRouter(<PropertyCard property={mockProperty} />);

    expect(screen.getByText('Beautiful House')).toBeInTheDocument();
    expect(screen.getByText('123 Main St, City, State')).toBeInTheDocument();
    expect(screen.getByText('$250,000')).toBeInTheDocument();
    expect(screen.getByText('A lovely family home')).toBeInTheDocument();
  });

  test('displays image with correct src and alt', () => {
    renderWithRouter(<PropertyCard property={mockProperty} />);

    const image = screen.getByAltText('Beautiful House');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  test('displays bedrooms and bathrooms when available', () => {
    renderWithRouter(<PropertyCard property={mockProperty} />);

    expect(screen.getByText('3 beds')).toBeInTheDocument();
    expect(screen.getByText('2 baths')).toBeInTheDocument();
  });

  test('does not display bedrooms and bathrooms when not available', () => {
    const propertyWithoutRooms = {
      ...mockProperty,
      bedrooms: undefined,
      bathrooms: undefined
    };

    renderWithRouter(<PropertyCard property={propertyWithoutRooms} />);

    expect(screen.queryByText(/beds/)).not.toBeInTheDocument();
    expect(screen.queryByText(/baths/)).not.toBeInTheDocument();
  });

  test('renders View Details link with correct href', () => {
    renderWithRouter(<PropertyCard property={mockProperty} />);

    const link = screen.getByRole('link', { name: /view details/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/property/1');
  });

  test('calls PropertyApplication.formatPropertyData with property', () => {
    renderWithRouter(<PropertyCard property={mockProperty} />);

    expect(PropertyApplication.formatPropertyData).toHaveBeenCalledWith(mockProperty);
  });

  test('handles image error gracefully', () => {
    renderWithRouter(<PropertyCard property={mockProperty} />);

    const image = screen.getByAltText('Beautiful House');
    expect(image).toHaveAttribute('onError');
  });
});