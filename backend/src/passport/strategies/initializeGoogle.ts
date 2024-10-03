import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../../models/user'; 
import bcrypt from "bcrypt";

const initializeGoogleLogin = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: 'http://localhost:3000/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ $or: [{ googleId: profile.id }, { email: profile.emails[0].value }] });

          if (!user) {
            user = new User({
              googleId: profile.id, 
              username: profile.displayName,
              name: profile.displayName, 
              email: profile.emails[0].value,  
              avatarUrl: profile.photos[0].value, 
            });

            await user.save();
          }

          return done(null, user); 
        } catch (error) {
          console.error('Google Authentication Error:', error); 
          return done(error, null); 
        }
      }
    )
  );
};


export default initializeGoogleLogin;