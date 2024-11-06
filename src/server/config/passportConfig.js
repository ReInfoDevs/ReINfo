import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import supabase from './supabaseClient.js'; // Import Supabase client

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Upsert the user's Google profile information into Supabase
        const { data, error } = await supabase
          .from('users')
          .upsert({
            id: profile.id,                       // Google profile ID as primary key
            provider: 'google',                   // OAuth provider
            email: profile.emails[0].value,       // User's email from Google profile
            name: profile.displayName,            // User's name from Google profile
            profile_picture: profile.photos[0].value, // Profile picture URL
            profile: profile._json                // Full JSON profile data
          });

        if (error) {
          console.error('Error saving user to Supabase:', error);
          return done(error, null);
        }
        return done(null, data[0]); // Returns the user record after upsert
      } catch (err) {
        console.error('Error in Passport GoogleStrategy:', err);
        return done(err, null);
      }
    }
  )
);

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
