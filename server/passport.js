const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
require("dotenv").config();
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
console.log(client_id);
passport.use(
  new SpotifyStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: "http://localhost:8888/auth/spotify/callback",
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      return done(null, profile, {
        accessToken,
        refreshToken,
        expires_in,
      });
    }
  )
);
