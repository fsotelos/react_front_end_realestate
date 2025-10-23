import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Filters from '../components/Filters';

const mockOnFilterChange = jest.fn();

const defaultFilters = {
  name: '',
  address: '',
  minPrice: '',
  maxPrice: '',
  page: 1,
  pageSize: 10,
};

describe('Filters', () => {
  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  test('renders all filter inputs', () => {
    render(<Filters onFilterChange={mockOnFilterChange} />);

    expect(screen.getByLabelText(/property name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/min price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/max price/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /clear filters/i })).toBeInTheDocument();
  });

  test('calls onFilterChange when name input changes', async () => {
    const user = userEvent.setup();
    render(<Filters onFilterChange={mockOnFilterChange} />);

    const nameInput = screen.getByLabelText(/property name/i);
    await user.type(nameInput, 'Test Property');

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...defaultFilters,
        name: 'Test Property',
      });
    });
  });

  test('calls onFilterChange when address input changes', async () => {
    const user = userEvent.setup();
    render(<Filters onFilterChange={mockOnFilterChange} />);

    const addressInput = screen.getByLabelText(/address/i);
    await user.type(addressInput, '123 Main St');

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...defaultFilters,
        address: '123 Main St',
      });
    });
  });

  test('calls onFilterChange when min price input changes', async () => {
    const user = userEvent.setup();
    render(<Filters onFilterChange={mockOnFilterChange} />);

    const minPriceInput = screen.getByLabelText(/min price/i);
    await user.type(minPriceInput, '100000');

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...defaultFilters,
        minPrice: '100000',
      });
    });
  });

  test('calls onFilterChange when max price input changes', async () => {
    const user = userEvent.setup();
    render(<Filters onFilterChange={mockOnFilterChange} />);

    const maxPriceInput = screen.getByLabelText(/max price/i);
    await user.type(maxPriceInput, '500000');

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...defaultFilters,
        maxPrice: '500000',
      });
    });
  });

  test('clears all filters when Clear Filters button is clicked', async () => {
    const user = userEvent.setup();
    render(<Filters onFilterChange={mockOnFilterChange} />);

    // Fill in some filters first
    const nameInput = screen.getByLabelText(/property name/i);
    const addressInput = screen.getByLabelText(/address/i);
    const minPriceInput = screen.getByLabelText(/min price/i);

    await user.type(nameInput, 'Test');
    await user.type(addressInput, 'Address');
    await user.type(minPriceInput, '100000');

    // Clear filters
    const clearButton = screen.getByRole('button', { name: /clear filters/i });
    await user.click(clearButton);

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith(defaultFilters);
    });

    // Verify inputs are cleared
    expect(nameInput).toHaveValue('');
    expect(addressInput).toHaveValue('');
    expect(minPriceInput.value).toBe('');
  });

  test('handles multiple input changes correctly', async () => {
    const user = userEvent.setup();
    render(<Filters onFilterChange={mockOnFilterChange} />);

    const nameInput = screen.getByLabelText(/property name/i);
    const minPriceInput = screen.getByLabelText(/min price/i);

    await user.type(nameInput, 'Villa');
    await user.type(minPriceInput, '200000');

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenLastCalledWith({
        ...defaultFilters,
        name: 'Villa',
        minPrice: '200000',
      });
    });
  });

  test('renders with correct form structure', () => {
    render(<Filters onFilterChange={mockOnFilterChange} />);

    const heading = screen.getByRole('heading', { name: /search & filter properties/i });
    expect(heading).toBeInTheDocument();

    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(2); // name and address

    const numberInputs = screen.getAllByRole('spinbutton');
    expect(numberInputs).toHaveLength(2); // minPrice and maxPrice
  });
});