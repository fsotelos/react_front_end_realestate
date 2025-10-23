import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutUs from '../components/AboutUs';

describe('AboutUs Component', () => {
  test('renders About Us section', () => {
    render(<AboutUs />);

    expect(screen.getByText('About Luxury Estates')).toBeInTheDocument();
    expect(screen.getByText(/With over two decades of experience/)).toBeInTheDocument();
    expect(screen.getByText('Award Winning')).toBeInTheDocument();
    expect(screen.getByText('Expert Team')).toBeInTheDocument();
    expect(screen.getByText('Premium Properties')).toBeInTheDocument();
    expect(screen.getByText('Trusted Service')).toBeInTheDocument();
  });

  test('renders team image', () => {
    render(<AboutUs />);

    const image = screen.getByAltText('Luxury real estate team meeting');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');
  });

  test('has correct section id', () => {
    const { container } = render(<AboutUs />);

    const section = container.querySelector('#about');
    expect(section).toBeInTheDocument();
  });
});