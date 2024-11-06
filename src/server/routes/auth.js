import express from 'express';
import passport from '../config/passportConfig.js';

const router = express.Router();

// Google OAuth login route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home
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
