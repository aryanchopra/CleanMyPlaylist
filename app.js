let express = require("express");
let cors = require("cors");
let path = require("path");
let cookieParser = require("cookie-parser");
const passport = require("passport");
const SpotifyStrategy = require("./passport");
const morgan = require("morgan");
const { resolve } = require("path");

morgan.token("data", (req, res) => {
  if (req.method == "POST") {
    return [req.body];
  }
  if (req.method == "PUT") {
    return [req.body];
  }
});

const morganmiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms :data"
);

let generateRandomString = function (length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// let stateKey = "spotify_auth_state";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser()).use(morganmiddleware);
app.use(passport.initialize());
app.use(express.static(__dirname + "/../client/public"));

const resolvedPath = path.resolve(__dirname + "/../client/public/index.html");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

app.get(
  "/api/login",
  passport.authenticate("spotify", {
    display: "popup",
    scope: [
      "user-read-email",
      "user-read-private",
      "playlist-modify-private",
      "playlist-read-private",
      "playlist-modify-public",
      "playlist-read-collaborative",
    ],
    showDialog: true,
  }),
  function (req, res) {}
);

app.get(
  "/auth/spotify/callback",
  passport.authenticate("spotify", {
    failureRedirect: "http://localhost:3000",
  }),
  function (req, res) {
    const authInfo = JSON.stringify(res.req.authInfo);
    res.cookie("authInfo", authInfo);
    res.redirect("http://localhost:3000/playlists");
  }
);

app.get("api/refresh_token", function (req, res) {
  // requesting access token from refresh token
  let refresh_token = req.query.refresh_token;
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  axios.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      let access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});
app.get("/*", function (req, res) {
  console.log("here");
  res.sendFile(resolvedPath);
});
const port = process.env.PORT || 8888;
console.log("Listening on", port);
app.listen(port);
