// __tests__/authRoutes.test.js
import request from 'supertest';
import app from '../server'; // Ensure this exports your Express app
import supabase from '../config/supabaseClient'; // Import Supabase client for mocking

// Mock Supabase client for testing
jest.mock('../config/supabaseClient', () => ({
  from: jest.fn().mockReturnThis(),
  upsert: jest.fn(() => ({ data: [{ id: '12345', name: 'Test User', email: 'testuser@example.com' }], error: null })),
}));

// Mock Passport to simulate authentication flow
jest.mock('passport', () => ({
  authenticate: (strategy, options) => (req, res, next) => {
    if (strategy === 'google') {
      // Simulate a successful Google login
      req.user = { id: '12345', name: 'Test User', email: 'testuser@example.com' };
      return next();
    }
    return res.redirect('/login'); // Redirect on failure
  },
}));

describe('Auth Routes', () => {
  it('should redirect to Google OAuth login page on /auth/google', async () => {
    const res = await request(app).get('/auth/google');
    expect(res.statusCode).toBe(302); // Should redirect to Google
    expect(res.headers.location).toMatch(/accounts\.google\.com/); // Check that it redirects to Google
  });

  it('should redirect to root ("/") on successful login via /auth/google/callback', async () => {
    const res = await request(app).get('/auth/google/callback');
    expect(res.statusCode).toBe(302); // Should redirect after login
    expect(res.headers.location).toBe('/'); // Redirects to root
  });

  it('should return user data on /auth/current_user if logged in', async () => {
    const res = await request(app)
      .get('/auth/current_user')
      .set('Cookie', 'session_id=12345'); // Simulate a session cookie

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      id: '12345',
      name: 'Test User',
      email: 'testuser@example.com'
    });
  });

  it('should return 401 on /auth/current_user if not logged in', async () => {
    const res = await request(app).get('/auth/current_user');
    expect(res.statusCode).toBe(401); // Unauthorized if no session
    expect(res.body.error).toBe('No user is currently logged in.');
  });
});
