import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PropertyList from '../components/PropertyList';
import PropertyApplication from '../application/PropertyApplication';

// Mock PropertyApplication
jest.mock('../application/PropertyApplication');

// Mock child components
jest.mock('../components/PropertyCard', () => {
  return function MockPropertyCard({ property }) {
    return <div data-testid={`property-card-${property.id}`}>{property.name}</div>;
  };
});

jest.mock('../components/Filters', () => {
  return function MockFilters({ onFilterChange }) {
    return (
      <div data-testid="filters">
        <button
          data-testid="filter-button"
          onClick={() => onFilterChange({ name: 'test', address: '', minPrice: '', maxPrice: '' })}
        >
          Apply Filter
        </button>
      </div>
    );
  };
});

jest.mock('../components/Sidebar', () => {
  return function MockSidebar() {
    return <div data-testid="sidebar">Sidebar</div>;
  };
});

const mockProperties = [
  { id: 1, name: 'Property 1', address: 'Address 1', price: 100000 },
  { id: 2, name: 'Property 2', address: 'Address 2', price: 200000 },
];

describe('PropertyList', () => {
  beforeEach(() => {
    PropertyApplication.loadProperties.mockResolvedValue(mockProperties);
    PropertyApplication.validateFilters.mockImplementation(filters => filters);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    render(<PropertyList />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders properties after loading', async () => {
    render(<PropertyList />);

    await waitFor(() => {
      expect(screen.getByTestId('property-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('property-card-2')).toBeInTheDocument();
    });

    expect(screen.getByText('Property 1')).toBeInTheDocument();
    expect(screen.getByText('Property 2')).toBeInTheDocument();
  });

  test('displays property count', async () => {
    render(<PropertyList />);

    await waitFor(() => {
      expect(screen.getByText('Showing 2 properties')).toBeInTheDocument();
    });
  });

  test('renders Filters component', async () => {
    render(<PropertyList />);

    await waitFor(() => {
      expect(screen.getByTestId('filters')).toBeInTheDocument();
    });
  });

  test('renders Sidebar component', async () => {
    render(<PropertyList />);

    await waitFor(() => {
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });
  });

  test('handles filter changes', async () => {
    render(<PropertyList />);

    await waitFor(() => {
      expect(PropertyApplication.loadProperties).toHaveBeenCalledTimes(1);
    });

    const filterButton = screen.getByTestId('filter-button');
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(PropertyApplication.loadProperties).toHaveBeenCalledTimes(2);
      expect(PropertyApplication.loadProperties).toHaveBeenLastCalledWith({
        name: 'test',
        address: '',
        minPrice: '',
        maxPrice: '',
        page: 1
      });
    });
  });

  test('handles loading error', async () => {
    PropertyApplication.loadProperties.mockRejectedValue(new Error('API Error'));

    render(<PropertyList />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load properties')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('property-card-1')).not.toBeInTheDocument();
  });

  test('displays no properties message when empty', async () => {
    PropertyApplication.loadProperties.mockResolvedValue([]);

    render(<PropertyList />);

    await waitFor(() => {
      expect(screen.getByText('No properties found matching your criteria.')).toBeInTheDocument();
    });
  });

  test('calls PropertyApplication.loadProperties on mount', async () => {
    render(<PropertyList />);

    await waitFor(() => {
      expect(PropertyApplication.loadProperties).toHaveBeenCalledWith({});
    });
  });

  test('calls PropertyApplication.validateFilters with filters', async () => {
    render(<PropertyList />);

    await waitFor(() => {
      expect(PropertyApplication.validateFilters).toHaveBeenCalledWith({});
    });
  });

  test('renders pagination when multiple pages', async () => {
    // Mock more properties to trigger pagination
    const manyProperties = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `Property ${i + 1}`,
      address: `Address ${i + 1}`,
      price: 100000 + i * 10000
    }));

    PropertyApplication.loadProperties.mockResolvedValue(manyProperties);

    render(<PropertyList />);

    await waitFor(() => {
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    // Should show pagination controls
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  test('does not render pagination for single page', async () => {
    render(<PropertyList />);

    await waitFor(() => {
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });
  });
});