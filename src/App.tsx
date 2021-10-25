import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Switch, Route, useParams } from "react-router";
import { BASE_URL, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "./utils";

export default function App(): JSX.Element {
  console.log(encodeURI(REDIRECT_URI), REDIRECT_URI);
  const location = useLocation();
  const params = useParams();
  const loginHandler = (): void => {
    const url =
      BASE_URL +
      "authorize" +
      "?client_id=" +
      CLIENT_ID +
      "&response_type=code" +
      "&redirect_uri=" +
      REDIRECT_URI +
      "&show_dialog=true" +
      "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url;
  };
  console.log(params);
  useEffect(() => {
    console.log("Location changed");
  }, [location]);
  return (
    <div className="w-full h-screen flex bg-black flex-col items-center justify-center">
      <Switch>
        {/* <Route path="/callback">
          <div>hi</div>
        </Route> */}
        <Route path="/">
          <div className="text-4xl text-white mt-5">Clean My Playlist</div>
          <button
            className="p-5 rounded-xl bg-green-400 mt-10"
            onClick={loginHandler}
          >
            Login with Spotify
          </button>
        </Route>
      </Switch>
    </div>
  );
}
