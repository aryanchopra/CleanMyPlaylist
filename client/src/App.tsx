import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Switch, Route, useParams } from "react-router";
import Login from "./Components/Login";
import Playlists from "./Components/Playlists";

export default function App(): JSX.Element {
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    console.log("Location changed");
  }, [location]);
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
