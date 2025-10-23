import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getProperties, getPropertyById } from '../services/api';

describe('API Service', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  describe('getProperties', () => {
    test('fetches properties successfully', async () => {
      const mockResponse = [
        { id: 1, name: 'Property 1', price: 100000 },
        { id: 2, name: 'Property 2', price: 200000 }
      ];

      mock.onGet('/properties').reply(200, mockResponse);

      const result = await getProperties();

      expect(result).toEqual(mockResponse);
      expect(mock.history.get[0].url).toBe('/properties');
    });

    test('applies filters correctly', async () => {
      const filters = {
        name: 'Villa',
        address: 'Main St',
        minPrice: '100000',
        maxPrice: '500000',
        page: 2,
        pageSize: 20
      };

      mock.onGet('/properties').reply(200, []);

      await getProperties(filters);

      const requestUrl = mock.history.get[0].url;
      expect(requestUrl).toContain('name=Villa');
      expect(requestUrl).toContain('address=Main%20St');
      expect(requestUrl).toContain('minPrice=100000');
      expect(requestUrl).toContain('maxPrice=500000');
      expect(requestUrl).toContain('page=2');
      expect(requestUrl).toContain('pageSize=20');
    });

    test('handles empty filters', async () => {
      mock.onGet('/properties').reply(200, []);

      await getProperties({});

      expect(mock.history.get[0].url).toBe('/properties');
    });

    test('handles API errors', async () => {
      mock.onGet('/properties').reply(500, { error: 'Server error' });

      await expect(getProperties()).rejects.toThrow();
    });

    test('handles network errors', async () => {
      mock.onGet('/properties').networkError();

      await expect(getProperties()).rejects.toThrow();
    });
  });

  describe('getPropertyById', () => {
    test('fetches property by id successfully', async () => {
      const mockProperty = { id: 1, name: 'Property 1', price: 100000 };

      mock.onGet('/properties/1').reply(200, mockProperty);

      const result = await getPropertyById(1);

      expect(result).toEqual(mockProperty);
      expect(mock.history.get[0].url).toBe('/properties/1');
    });

    test('handles property not found', async () => {
      mock.onGet('/properties/999').reply(404, { error: 'Property not found' });

      await expect(getPropertyById(999)).rejects.toThrow();
    });

    test('handles API errors', async () => {
      mock.onGet('/properties/1').reply(500, { error: 'Server error' });

      await expect(getPropertyById(1)).rejects.toThrow();
    });

    test('handles network errors', async () => {
      mock.onGet('/properties/1').networkError();

      await expect(getPropertyById(1)).rejects.toThrow();
    });
  });
});