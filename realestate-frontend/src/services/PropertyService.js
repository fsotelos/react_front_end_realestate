import PropertyRepository from '../repositories/PropertyRepository';

class PropertyService {
  async getProperties(filters = {}) {
    try {
      const properties = await PropertyRepository.getAll(filters);

      // Add default images if not provided
      return properties.map(property => ({
        ...property,
        imageUrl: property.imageUrl || this.generatePropertyImage(property.id)
      }));
    } catch (error) {
      console.error('Service error fetching properties:', error);
      throw error;
    }
  }

  async getPropertyById(id) {
    try {
      const property = await PropertyRepository.getById(id);

      // Add default image if not provided
      return {
        ...property,
        imageUrl: property.imageUrl || this.generatePropertyImage(property.id)
      };
    } catch (error) {
      console.error('Service error fetching property by ID:', error);
      throw error;
    }
  }

  async getTopProperties(limit = 5) {
    try {
      const properties = await PropertyRepository.getTopProperties(limit);

      // Add default images if not provided
      return properties.map(property => ({
        ...property,
        imageUrl: property.imageUrl || this.generatePropertyImage(property.id)
      }));
    } catch (error) {
      console.error('Service error fetching top properties:', error);
      throw error;
    }
  }

  generatePropertyImage(propertyId) {
    // Use Lorem Picsum for consistent property images based on ID
    return `https://picsum.photos/400/300?random=${propertyId}`;
  }

  formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }

  formatAddress(address) {
    // Basic address formatting - can be enhanced
    return address;
  }
}

export default new PropertyService();