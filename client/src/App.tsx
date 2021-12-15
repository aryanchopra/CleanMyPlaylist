import React from "react";
import { Switch, Route } from "react-router";
import Login from "./Components/Login";
import Playlists from "./Components/Playlists";

export default function App(): JSX.Element {
  return (
    <div className="w-full h-screen bg-black font-opensans font-semibold">
      <Switch>
        <Route path="/playlists">
          <Playlists />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}
