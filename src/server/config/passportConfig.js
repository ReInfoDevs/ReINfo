import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import supabase from './supabaseClient.js';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3333/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Log Google profile data to ensure it’s being received correctly
        console.log('Google profile:', {
          id: profile.id,
          provider: 'google',
          email: profile.emails[0].value,
          name: profile.displayName,
          profile_picture: profile.photos[0].value,
          profile: profile._json,
        });

        // Attempt to upsert the user's Google profile information into Supabase
        const { data, error } = await supabase
  .from('users')
  .upsert({
    id: profile.id,
    provider: 'google',
    email: profile.emails[0].value,
    name: profile.displayName,
    profile_picture: profile.photos[0].value,
    profile: profile._json,
  })
  .select(); // This explicitly tells Supabase to return the upserted data

console.log('Supabase upsert response:', { data, error });

        // Log the response from Supabase for debugging
        console.log('Supabase upsert response:', { data, error });

        // Check if there was an error during the upsert operation
        if (error) {
          console.error('Error saving user to Supabase:', error);
          return done(error, null);
        }

        // Handle the case where no data is returned
        if (!data || data.length === 0) {
          console.error('No data returned from Supabase upsert');
          return done(new Error('No data returned from Supabase upsert'), null);
        }

        // Successful upsert; return the user data to Passport
        return done(null, data[0]);
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
