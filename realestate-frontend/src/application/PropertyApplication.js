import PropertyService from '../services/PropertyService';

class PropertyApplication {
  constructor() {
    this.propertyService = PropertyService;
  }

  async loadProperties(filters = {}) {
    try {
      return await this.propertyService.getProperties(filters);
    } catch (error) {
      console.error('Application error loading properties:', error);
      throw new Error('Failed to load properties. Please try again later.');
    }
  }

  async loadPropertyDetails(id) {
    try {
      const property = await this.propertyService.getPropertyById(id);
      if (!property) {
        throw new Error('Property not found');
      }
      return property;
    } catch (error) {
      console.error('Application error loading property details:', error);
      if (error.message === 'Property not found') {
        throw error;
      }
      throw new Error('Failed to load property details. Please try again later.');
    }
  }

  async loadTopProperties(limit = 5) {
    try {
      return await this.propertyService.getTopProperties(limit);
    } catch (error) {
      console.error('Application error loading top properties:', error);
      // Return empty array instead of throwing to avoid breaking the UI
      return [];
    }
  }

  formatPropertyData(property) {
    return {
      ...property,
      formattedPrice: this.propertyService.formatPrice(property.price),
      formattedAddress: this.propertyService.formatAddress(property.address),
    };
  }

  validateFilters(filters) {
    const validatedFilters = { ...filters };

    // Ensure page is a positive integer
    if (validatedFilters.page && (isNaN(validatedFilters.page) || validatedFilters.page < 1)) {
      validatedFilters.page = 1;
    }

    // Ensure pageSize is reasonable
    if (validatedFilters.pageSize && (isNaN(validatedFilters.pageSize) || validatedFilters.pageSize < 1 || validatedFilters.pageSize > 100)) {
      validatedFilters.pageSize = 100;
    }

    // Ensure price ranges are valid
    if (validatedFilters.minPrice && isNaN(validatedFilters.minPrice)) {
      delete validatedFilters.minPrice;
    }
    if (validatedFilters.maxPrice && isNaN(validatedFilters.maxPrice)) {
      delete validatedFilters.maxPrice;
    }

    return validatedFilters;
  }
}

export default new PropertyApplication();