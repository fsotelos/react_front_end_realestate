import PropertyService from '../services/PropertyService';

describe('PropertyService', () => {
  test('should format price correctly', () => {
    const service = PropertyService;
    expect(service.formatPrice(100000)).toBe('$100,000');
    expect(service.formatPrice(1500000)).toBe('$1,500,000');
  });

  test('should generate property image URL', () => {
    const service = PropertyService;
    const imageUrl = service.generatePropertyImage(123);
    expect(imageUrl).toBe('https://picsum.photos/400/300?random=123');
  });

  test('should format address', () => {
    const service = PropertyService;
    expect(service.formatAddress('123 Main St')).toBe('123 Main St');
  });
});