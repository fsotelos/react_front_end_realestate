import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://localhost:7259/api/v1.0';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// API service functions
export const getProperties = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    console.log('API getProperties called with raw filters:', filters); // Debug log

    // Only append non-empty, non-undefined values
    Object.keys(filters).forEach(key => {
      const value = filters[key];
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
        console.log(`Adding filter: ${key}=${value}`); // Debug log
      }
    });

    const queryString = params.toString();
    const url = `/properties${queryString ? `?${queryString}` : ''}`;
    console.log('Final API URL being called:', url); // Debug log

    const response = await api.get(url);
    console.log('API Response received:', {
      status: response.status,
      dataKeys: Object.keys(response.data),
      propertiesCount: response.data.properties ? response.data.properties.length : 'N/A',
      totalCount: response.data.totalCount || 'N/A'
    }); // Debug log

    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
};

export const getPropertyById = async (id) => {
  try {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching property details:', error);
    throw error;
  }
};

export default api;