// __tests__/Login.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/Login';

describe('Login Component', () => {
  it('renders the Login with Google button', () => {
    render(<Login />);
    const loginButton = screen.getByText(/Login with Google/i);
    expect(loginButton).toBeInTheDocument();
  });

  it('redirects to /auth/google when Login with Google button is clicked', () => {
    render(<Login />);
    const loginButton = screen.getByText(/Login with Google/i);

    // Mock window.location.href to test redirection
    delete window.location;
    window.location = { href: '' }; // Set a blank href to observe changes

    // Simulate button click
    fireEvent.click(loginButton);

    // Check that the href is set to the Google OAuth route
    expect(window.location.href).toBe('http://localhost:3333/auth/google');
  });
});
