const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
require("dotenv").config();
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const mode = process.env.NODE_ENV;

const BASE_URL =
  mode === "development"
    ? "http://localhost:8888"
    : "https://cleanmyplaylist.herokuapp.com";
passport.use(
  new SpotifyStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: `${BASE_URL}/auth/spotify/callback`,
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
