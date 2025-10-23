import { getProperties, getPropertyById } from '../services/api';

class PropertyRepository {
  async getAll(filters = {}) {
    try {
      const data = await getProperties(filters);
      return Array.isArray(data) ? data : data.properties || [];
    } catch (error) {
      console.error('Repository error fetching properties:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const data = await getPropertyById(id);
      return data;
    } catch (error) {
      console.error('Repository error fetching property by ID:', error);
      throw error;
    }
  }

  async getTopProperties(limit = 5) {
    try {
      // Assuming backend supports sorting by price descending
      const data = await getProperties({ pageSize: limit, sortBy: 'price', sortOrder: 'desc' });
      return Array.isArray(data) ? data.slice(0, limit) : (data.properties || []).slice(0, limit);
    } catch (error) {
      console.error('Repository error fetching top properties:', error);
      throw error;
    }
  }
}

export default new PropertyRepository();