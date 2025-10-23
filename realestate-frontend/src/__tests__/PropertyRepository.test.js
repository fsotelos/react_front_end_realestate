import PropertyRepository from '../repositories/PropertyRepository';
import { getProperties, getPropertyById } from '../services/api';

// Mock the API functions
jest.mock('../services/api');

describe('PropertyRepository', () => {
  let repository;

  beforeEach(() => {
    repository = new PropertyRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    test('fetches all properties successfully', async () => {
      const mockData = [
        { id: 1, name: 'Property 1' },
        { id: 2, name: 'Property 2' }
      ];

      getProperties.mockResolvedValue(mockData);

      const result = await repository.getAll();

      expect(getProperties).toHaveBeenCalledWith({});
      expect(result).toEqual(mockData);
    });

    test('applies filters when provided', async () => {
      const filters = { name: 'Villa', minPrice: 100000 };
      const mockData = [{ id: 1, name: 'Villa 1' }];

      getProperties.mockResolvedValue(mockData);

      const result = await repository.getAll(filters);

      expect(getProperties).toHaveBeenCalledWith(filters);
      expect(result).toEqual(mockData);
    });

    test('handles array response', async () => {
      const mockData = [{ id: 1, name: 'Property 1' }];
      getProperties.mockResolvedValue(mockData);

      const result = await repository.getAll();

      expect(result).toEqual(mockData);
    });

    test('handles object response with properties array', async () => {
      const mockResponse = {
        properties: [{ id: 1, name: 'Property 1' }],
        totalCount: 1
      };
      getProperties.mockResolvedValue(mockResponse);

      const result = await repository.getAll();

      expect(result).toEqual(mockResponse.properties);
    });

    test('returns empty array when no properties in response', async () => {
      const mockResponse = { totalCount: 0 };
      getProperties.mockResolvedValue(mockResponse);

      const result = await repository.getAll();

      expect(result).toEqual([]);
    });

    test('handles API errors', async () => {
      const mockError = new Error('API Error');
      getProperties.mockRejectedValue(mockError);

      await expect(repository.getAll()).rejects.toThrow('API Error');
    });
  });

  describe('getById', () => {
    test('fetches property by id successfully', async () => {
      const mockProperty = { id: 1, name: 'Property 1' };
      getPropertyById.mockResolvedValue(mockProperty);

      const result = await repository.getById(1);

      expect(getPropertyById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockProperty);
    });

    test('handles API errors', async () => {
      const mockError = new Error('Property not found');
      getPropertyById.mockRejectedValue(mockError);

      await expect(repository.getById(1)).rejects.toThrow('Property not found');
    });
  });

  describe('getTopProperties', () => {
    test('fetches top properties with default limit', async () => {
      const mockData = [
        { id: 1, name: 'Top Property 1', price: 500000 },
        { id: 2, name: 'Top Property 2', price: 450000 }
      ];

      getProperties.mockResolvedValue(mockData);

      const result = await repository.getTopProperties();

      expect(getProperties).toHaveBeenCalledWith({
        pageSize: 5,
        sortBy: 'price',
        sortOrder: 'desc'
      });
      expect(result).toEqual(mockData);
    });

    test('fetches top properties with custom limit', async () => {
      const mockData = [{ id: 1, name: 'Top Property 1' }];
      getProperties.mockResolvedValue(mockData);

      const result = await repository.getTopProperties(3);

      expect(getProperties).toHaveBeenCalledWith({
        pageSize: 3,
        sortBy: 'price',
        sortOrder: 'desc'
      });
      expect(result).toEqual(mockData);
    });

    test('handles array response and slices to limit', async () => {
      const mockData = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `Property ${i + 1}`
      }));

      getProperties.mockResolvedValue(mockData);

      const result = await repository.getTopProperties(3);

      expect(result).toHaveLength(3);
      expect(result).toEqual(mockData.slice(0, 3));
    });

    test('handles object response with properties array', async () => {
      const mockResponse = {
        properties: [
          { id: 1, name: 'Property 1' },
          { id: 2, name: 'Property 2' },
          { id: 3, name: 'Property 3' }
        ]
      };

      getProperties.mockResolvedValue(mockResponse);

      const result = await repository.getTopProperties(2);

      expect(result).toEqual(mockResponse.properties.slice(0, 2));
    });

    test('handles API errors', async () => {
      const mockError = new Error('API Error');
      getProperties.mockRejectedValue(mockError);

      await expect(repository.getTopProperties(5)).rejects.toThrow('API Error');
    });
  });
});