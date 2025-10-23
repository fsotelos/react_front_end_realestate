import PropertyApplication from '../application/PropertyApplication';
import PropertyService from '../services/PropertyService';

// Mock PropertyService
jest.mock('../services/PropertyService');

const mockPropertyService = {
  getProperties: jest.fn(),
  getPropertyById: jest.fn(),
  getTopProperties: jest.fn(),
  formatPrice: jest.fn(),
  formatAddress: jest.fn()
};

describe('PropertyApplication', () => {
  let propertyApplication;

  beforeEach(() => {
    PropertyService.mockImplementation(() => mockPropertyService);
    propertyApplication = new PropertyApplication();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loadProperties', () => {
    test('loads properties successfully', async () => {
      const mockFilters = { name: 'test' };
      const mockProperties = [{ id: 1, name: 'Property 1' }];

      mockPropertyService.getProperties.mockResolvedValue(mockProperties);

      const result = await propertyApplication.loadProperties(mockFilters);

      expect(mockPropertyService.getProperties).toHaveBeenCalledWith(mockFilters);
      expect(result).toEqual(mockProperties);
    });

    test('handles service errors', async () => {
      const mockError = new Error('Service error');
      mockPropertyService.getProperties.mockRejectedValue(mockError);

      await expect(propertyApplication.loadProperties({}))
        .rejects.toThrow('Failed to load properties. Please try again later.');
    });
  });

  describe('loadPropertyDetails', () => {
    test('loads property details successfully', async () => {
      const mockProperty = { id: 1, name: 'Property 1' };
      mockPropertyService.getPropertyById.mockResolvedValue(mockProperty);

      const result = await propertyApplication.loadPropertyDetails(1);

      expect(mockPropertyService.getPropertyById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockProperty);
    });

    test('throws error for not found property', async () => {
      const mockError = new Error('Property not found');
      mockPropertyService.getPropertyById.mockRejectedValue(mockError);

      await expect(propertyApplication.loadPropertyDetails(1))
        .rejects.toThrow('Property not found');
    });

    test('handles other service errors', async () => {
      const mockError = new Error('Network error');
      mockPropertyService.getPropertyById.mockRejectedValue(mockError);

      await expect(propertyApplication.loadPropertyDetails(1))
        .rejects.toThrow('Failed to load property details. Please try again later.');
    });
  });

  describe('loadTopProperties', () => {
    test('loads top properties successfully', async () => {
      const mockProperties = [{ id: 1, name: 'Top Property' }];
      mockPropertyService.getTopProperties.mockResolvedValue(mockProperties);

      const result = await propertyApplication.loadTopProperties(5);

      expect(mockPropertyService.getTopProperties).toHaveBeenCalledWith(5);
      expect(result).toEqual(mockProperties);
    });

    test('returns empty array on error', async () => {
      mockPropertyService.getTopProperties.mockRejectedValue(new Error('Service error'));

      const result = await propertyApplication.loadTopProperties(5);

      expect(result).toEqual([]);
    });
  });

  describe('formatPropertyData', () => {
    test('formats property data correctly', () => {
      const mockProperty = {
        id: 1,
        name: 'Test Property',
        price: 250000,
        address: '123 Main St'
      };

      mockPropertyService.formatPrice.mockReturnValue('$250,000');
      mockPropertyService.formatAddress.mockReturnValue('123 Main St');

      const result = propertyApplication.formatPropertyData(mockProperty);

      expect(mockPropertyService.formatPrice).toHaveBeenCalledWith(250000);
      expect(mockPropertyService.formatAddress).toHaveBeenCalledWith('123 Main St');
      expect(result).toEqual({
        ...mockProperty,
        formattedPrice: '$250,000',
        formattedAddress: '123 Main St'
      });
    });
  });

  describe('validateFilters', () => {
    test('validates page number', () => {
      const result = propertyApplication.validateFilters({ page: 'invalid' });
      expect(result.page).toBe(1);

      const result2 = propertyApplication.validateFilters({ page: 0 });
      expect(result2.page).toBe(1);

      const result3 = propertyApplication.validateFilters({ page: 5 });
      expect(result3.page).toBe(5);
    });

    test('validates pageSize', () => {
      const result = propertyApplication.validateFilters({ pageSize: 'invalid' });
      expect(result.pageSize).toBe(10);

      const result2 = propertyApplication.validateFilters({ pageSize: 0 });
      expect(result2.pageSize).toBe(10);

      const result3 = propertyApplication.validateFilters({ pageSize: 150 });
      expect(result3.pageSize).toBe(10);

      const result4 = propertyApplication.validateFilters({ pageSize: 50 });
      expect(result4.pageSize).toBe(50);
    });

    test('validates price ranges', () => {
      const result = propertyApplication.validateFilters({
        minPrice: 'invalid',
        maxPrice: 'also invalid'
      });

      expect(result.minPrice).toBeUndefined();
      expect(result.maxPrice).toBeUndefined();

      const result2 = propertyApplication.validateFilters({
        minPrice: 100000,
        maxPrice: 500000
      });

      expect(result2.minPrice).toBe(100000);
      expect(result2.maxPrice).toBe(500000);
    });

    test('preserves valid filters', () => {
      const filters = {
        name: 'Villa',
        address: 'Main St',
        minPrice: 100000,
        maxPrice: 500000,
        page: 2,
        pageSize: 20
      };

      const result = propertyApplication.validateFilters(filters);
      expect(result).toEqual(filters);
    });
  });
});