const express = require('express');
const router = express.Router();
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const authController = require('../app/controllers/AuthController');

const GOOGLE_CLIENT_ID = '975117887392-jq8lekc87o0e4ndjnaul1r3gcfjsig87.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

router.use(
  session({
    secret: 'dumamay',
    resave: false,
    saveUninitialized: false
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

// Serialize user
passport.serializeUser(function (user, done) {
  // Extract only necessary user data to avoid serialization errors
  const serializedUser = {
    id: user.id,
    name: user.name,
    email: user.email
    // Add any other necessary properties
  };
  done(null, serializedUser);
});

// Deserialize user
passport.deserializeUser(function (serializedUser, done) {
  // Reconstruct the user object using the serialized data
  const user = {
    id: serializedUser.id,
    name: serializedUser.name,
    email: serializedUser.email
    // Add any other necessary properties
  };
  done(null, user);
});

// Initialize passport middleware
router.use(passport.initialize());
router.use(passport.session());

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), authController.callback);

module.exports = router;