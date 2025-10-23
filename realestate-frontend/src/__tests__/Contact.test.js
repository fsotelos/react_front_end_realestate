import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '../components/Contact';

describe('Contact Component', () => {
  test('renders Contact section', () => {
    render(<Contact />);

    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByText(/Ready to find your dream property/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your full name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tell us about your property requirements or questions...')).toBeInTheDocument();
  });

  test('renders contact information', () => {
    render(<Contact />);

    expect(screen.getByText('Call Us')).toBeInTheDocument();
    expect(screen.getByText('Email Us')).toBeInTheDocument();
    expect(screen.getByText('Visit Us')).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    render(<Contact />);

    const nameInput = screen.getByPlaceholderText('Enter your full name');
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    const messageInput = screen.getByPlaceholderText('Tell us about your property requirements or questions...');
    const submitButton = screen.getByText('Send Message');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'I am interested in properties.' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Thank you for your message!')).toBeInTheDocument();
    });
  });

  test('has correct section id', () => {
    const { container } = render(<Contact />);

    const section = container.querySelector('#contact');
    expect(section).toBeInTheDocument();
  });
});