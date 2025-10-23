import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import PropertyDetails from '../components/PropertyDetails';
import PropertyApplication from '../application/PropertyApplication';

// Mock PropertyApplication
jest.mock('../application/PropertyApplication');

// Mock Map component
jest.mock('../components/Map', () => {
  return function MockMap({ address }) {
    return <div data-testid="map" data-address={address}>Map Component</div>;
  };
});

const mockProperty = {
  id: 1,
  name: 'Beautiful House',
  address: '123 Main St, City, State',
  price: 250000,
  description: 'A lovely family home with great amenities',
  bedrooms: 3,
  bathrooms: 2,
  imageUrl: 'https://example.com/image.jpg'
};

const renderWithRouter = (component, initialEntries = ['/property/1']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {component}
    </MemoryRouter>
  );
};

describe('PropertyDetails', () => {
  beforeEach(() => {
    PropertyApplication.loadPropertyDetails.mockResolvedValue(mockProperty);
    PropertyApplication.formatPropertyData.mockReturnValue({
      ...mockProperty,
      formattedPrice: '$250,000',
      formattedAddress: mockProperty.address
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    renderWithRouter(<PropertyDetails />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders property details after loading', async () => {
    renderWithRouter(<PropertyDetails />);

    await waitFor(() => {
      expect(screen.getByText('Beautiful House')).toBeInTheDocument();
    });

    expect(screen.getByText('123 Main St, City, State')).toBeInTheDocument();
    expect(screen.getByText('$250,000')).toBeInTheDocument();
    expect(screen.getByText('A lovely family home with great amenities')).toBeInTheDocument();
  });

  test('displays property image', async () => {
    renderWithRouter(<PropertyDetails />);

    await waitFor(() => {
      const image = screen.getByAltText('Beautiful House');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    });
  });

  test('displays bedrooms and bathrooms', async () => {
    renderWithRouter(<PropertyDetails />);

    await waitFor(() => {
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('Bedrooms')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('Bathrooms')).toBeInTheDocument();
    });
  });

  test('renders Map component with address', async () => {
    renderWithRouter(<PropertyDetails />);

    await waitFor(() => {
      const map = screen.getByTestId('map');
      expect(map).toBeInTheDocument();
      expect(map).toHaveAttribute('data-address', mockProperty.address);
    });
  });

  test('displays property summary in sidebar', async () => {
    renderWithRouter(<PropertyDetails />);

    await waitFor(() => {
      expect(screen.getByText('Property Summary')).toBeInTheDocument();
      expect(screen.getAllByText('$250,000')).toHaveLength(2); // Price appears in main and summary
      expect(screen.getAllByText('123 Main St, City, State')).toHaveLength(2); // Address appears in main and summary
    });
  });

  test('renders contact agent section', async () => {
    renderWithRouter(<PropertyDetails />);

    await waitFor(() => {
      expect(screen.getByText('Contact Agent')).toBeInTheDocument();
      expect(screen.getByText('Call Now')).toBeInTheDocument();
      expect(screen.getByText('Send Message')).toBeInTheDocument();
    });
  });

  test('renders Back to Properties link', async () => {
    renderWithRouter(<PropertyDetails />);

    await waitFor(() => {
      const backLink = screen.getByRole('link', { name: /back to properties/i });
      expect(backLink).toBeInTheDocument();
      expect(backLink).toHaveAttribute('href', '/');
    });
  });

  test('handles loading error', async () => {
    PropertyApplication.loadPropertyDetails.mockRejectedValue(new Error('Property not found'));

    renderWithRouter(<PropertyDetails />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load property details')).toBeInTheDocument();
    });

    const backLink = screen.getByRole('link', { name: /back to properties/i });
    expect(backLink).toBeInTheDocument();
  });

  test('handles property not found', async () => {
    PropertyApplication.loadPropertyDetails.mockRejectedValue(new Error('Property not found'));

    renderWithRouter(<PropertyDetails />);

    await waitFor(() => {
      expect(screen.getByText('Property not found')).toBeInTheDocument();
    });
  });

  test('calls PropertyApplication.loadPropertyDetails with correct id', async () => {
    renderWithRouter(<PropertyDetails />, ['/property/5']);

    await waitFor(() => {
      expect(PropertyApplication.loadPropertyDetails).toHaveBeenCalledWith('5');
    });
  });

  test('calls PropertyApplication.formatPropertyData with property', async () => {
    renderWithRouter(<PropertyDetails />);

    await waitFor(() => {
      expect(PropertyApplication.formatPropertyData).toHaveBeenCalledWith(mockProperty);
    });
  });

  test('does not display bedrooms/bathrooms when not available', async () => {
    const propertyWithoutRooms = {
      ...mockProperty,
      bedrooms: undefined,
      bathrooms: undefined
    };

    PropertyApplication.loadPropertyDetails.mockResolvedValue(propertyWithoutRooms);

    renderWithRouter(<PropertyDetails />);

    await waitFor(() => {
      expect(screen.queryByText('Bedrooms')).not.toBeInTheDocument();
      expect(screen.queryByText('Bathrooms')).not.toBeInTheDocument();
    });
  });

  test('handles image error gracefully', async () => {
    renderWithRouter(<PropertyDetails />);

    await waitFor(() => {
      const image = screen.getByAltText('Beautiful House');
      expect(image).toHaveAttribute('onError');
    });
  });
});