const dotenv = require('dotenv');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


dotenv.config({ path: './config/config.env' });

// Configure Passport to use Google OAuth 2.0 strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            callbackURL: 'https://b9dk2wds-5000.use.devtunnels.ms/google/callback',
        },

        function(accessToken, refreshToken, profile, done) {
            // Here you can save the user profile to the database if needed
            // Then generate an access token
        
            // Generate an access token (or use refreshToken)
            // const token = generateSignedJWT(profile.id);
         
        
            // Pass the access token to the callback function
            return done(null, accessToken);
          }
    )
)

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});