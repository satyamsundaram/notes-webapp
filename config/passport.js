const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

const callbackURL = process.env.CALLBACK_URL || "http://localhost:5000/auth/google/callback";

module.exports = (passport) => {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: callbackURL,
        },
        async (accessToken, refreshToken, profile, done) => {
          // check if user already exists in db
          const existingUser = await User.findOne({ googleId: profile.id });
          if (existingUser) {
            return done(null, existingUser);
          }

          // if not, create a new user in the db
          const user = await new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          }).save();
          done(null, user);
        }
      )
    );

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      User.findById(id).then((user) => {
        done(null, user);
      });
    });
}