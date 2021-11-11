import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

type Tokens = {
  accessToken: string;
  refreshToken: string;
  expires_in: Number;
};

const getTokens = (): Tokens => {
  const cookieObj = document.cookie.split("; ").reduce((prev: any, current) => {
    const [name, ...value] = current.split("=");
    prev[name] = value.join("=");
    return prev;
  }, {});

  const tokens: Tokens = cookieObj.authInfo
    ? JSON.parse(decodeURIComponent(cookieObj.authInfo))
    : null;

  return tokens;
};
export default function Playlists(): JSX.Element {
  const [accessToken, setAccessToken] = useState<string>("");
  const [playlist, setPlaylist] = useState<any>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();
  useEffect(() => {
    const tokens = getTokens();
    tokens ? setAccessToken(tokens.accessToken) : history.push("/");
    if (!tokens) return;
    axios
      .get("https://api.spotify.com/v1/me/", {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      })
      .then((res) => setProfile(res.data));
    axios
      .get("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      })
      .then((res) => {
        setPlaylist((prev: any) => [...prev, ...res.data.items]);
        let calls = Math.ceil(res.data.total / res.data.limit);
        let next_url = res.data.next;
        while (calls > 1) {
          axios
            .get(next_url, {
              headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
              },
            })
            .then((res) => {
              next_url = res.data.next;
              setPlaylist((prev: any) => [...prev, ...res.data.items]);
            });
          calls--;
        }
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, []);

  var delete_cookie = function (name: string) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };
  const logoutHandler = (): void => {
    delete_cookie("authInfo");
    history.push("/");
  };

  if (!loading)
    return (
      <>
        <div className="flex justify-center text-white mt-1">
          Hi {profile.display_name}!{" "}
          <button className="p-4 bg-green-400" onClick={logoutHandler}>
            Logout
          </button>
        </div>
        <div className="flex justify-center mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 grid-rows-2 bg-blue-300 grid-flow-row w-7/12 gap-3">
            <div className="bg-red-300 h-20">item-1</div>
            <div className="bg-red-300">item-1</div>
            <div className="bg-red-300">item-1</div>
            <div className="bg-red-300">item-1</div>
            <div className="bg-red-300">item-1</div>
            <div className="bg-red-300">item-1</div>
            <div className="bg-red-300">item-1</div>
            <div className="bg-red-300">item-1</div>
            <div className="bg-red-300">item-1</div>
            <div className="bg-red-300">item-1</div>
            <div className="bg-red-300 h-20">item-1</div>
          </div>
        </div>
      </>
    );
  else
    return (
      <div className="text-4xl text-white flex justify-center items-center h-full">
        Loading...
      </div>
    );
}
