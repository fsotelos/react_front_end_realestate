import '@testing-library/jest-dom';

// Mock environment variables
process.env.REACT_APP_API_BASE_URL = 'https://localhost:7259/api/v1.0';
process.env.REACT_APP_COMPANY_NAME = 'RealEstate Pro';
process.env.REACT_APP_COMPANY_EMAIL = 'info@realestatepro.com';
process.env.REACT_APP_COMPANY_PHONE = '+1 (555) 123-4567';
process.env.REACT_APP_COMPANY_ADDRESS = '123 Real Estate Ave, Property City, PC 12345';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};