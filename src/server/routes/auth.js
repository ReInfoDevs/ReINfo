import express from 'express';
import passport from '../config/passportConfig.js';

const router = express.Router();

// Google OAuth login route
router.get('/google', (req, res, next) => {
  console.log('Initiating Google OAuth');
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

// Google OAuth callback route
router.get(
  '/google/callback',
  (req, res, next) => {
    console.log('Received callback from Google');
    next();
  },
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log('Authentication successful, redirecting to home');
    res.redirect('http://localhost:8080/home');
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).send('Error logging out.');
    }
    res.redirect('/');
  });
});

// Route to get the current user
router.get('/current_user', (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
     res.status(401).send('No user is currently logged in.');
  }
});

export default router;
