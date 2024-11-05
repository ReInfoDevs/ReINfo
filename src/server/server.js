// server.js

import express from 'express';
import session from 'express-session';
import path from 'path';
import techRouter from './routes/tech.js'

import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import passport from './config/passportConfig.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Session configuration using `express-session`
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Use your SESSION_SECRET from .env
    resave: false,                       // Prevents session from being saved back to the store if it hasn’t changed
    saveUninitialized: false,            // Ensures a session is not saved for unauthenticated users
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// JSON parsing middleware
app.use(express.json());

// Serve static files
app.use('/', express.static(path.join(__dirname, '../../dist')));

// Use authRoutes for all authentication-related routes
app.use('/auth', authRoutes);

app.use('/tech', techRouter)

// Catch-all route for 404 errors
app.use('*', (req, res) => {
  console.log('hitting 404 message');
  return res.status(404).send('Page not found');
});

// Global error handler with enhanced error logging
app.use((err, req, res, next) => {
  const defaultError = {
    log: err.stack || 'Express error handler caught unknown error',
    status: err.status || 500,
    message: err.message || 'An error occurred.',
  };
  console.error(defaultError.log);
  return res.status(defaultError.status).json({ error: defaultError.message });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
