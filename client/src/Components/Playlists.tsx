import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import PlaylistCard from "./PlaylistCard";
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
  const [playlists, setPlaylists] = useState<any>([]);
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
        setPlaylists((prev: any) => [...prev, ...res.data.items]);
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
              setPlaylists((prev: any) => [...prev, ...res.data.items]);
            });
          calls--;
        }
        setTimeout(() => {
          setLoading(false);
        }, 10);
      });
  }, []);

  var delete_cookie = function (name: string) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };
  const logoutHandler = (): void => {
    delete_cookie("authInfo");
    history.push("/");
  };

  if (!loading) {
    console.log(playlists);
    return (
      <div className="h-full overflow-scroll overflow-x-hidden">
        <div className="flex justify-center text-white mt-1">
          Hi {profile.display_name}!{" "}
          <button className="p-4 bg-green-400" onClick={logoutHandler}>
            Logout
          </button>
        </div>
        <div className="flex  justify-center mt-6 ">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 grid-rows-2  grid-flow-row w-7/12 gap-3">
            {playlists.map((playlist: any) => (
              <PlaylistCard
                key={playlist.id}
                url={playlist.external_urls.spotify}
                img={playlist.images[0].url}
                name={playlist.name}
                tracks={playlist.tracks.total}
                token={accessToken}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div className="text-4xl text-white flex justify-center items-center h-full">
        Loading...
      </div>
    );
}

const playlist = {
  collaborative: false,
  description: "",
  external_urls: {
    spotify: "https://open.spotify.com/playlist/32037vlVm5bjcLBU00gkx8",
  },
  href: "https://api.spotify.com/v1/playlists/32037vlVm5bjcLBU00gkx8",
  id: "32037vlVm5bjcLBU00gkx8",
  images: [
    {
      height: 640,
      url: "https://i.scdn.co/image/ab67616d0000b27310e6745bb2f179dd3616b85f",
      width: 640,
    },
  ],
  name: "classics only",
  owner: {
    display_name: "Aryan Chopra",
    external_urls: {
      spotify: "https://open.spotify.com/user/31wncfgmnvnuerqrnnvx2v3fyp3m",
    },
    href: "https://api.spotify.com/v1/users/31wncfgmnvnuerqrnnvx2v3fyp3m",
    id: "31wncfgmnvnuerqrnnvx2v3fyp3m",
    type: "user",
    uri: "spotify:user:31wncfgmnvnuerqrnnvx2v3fyp3m",
  },
  primary_color: null,
  public: false,
  snapshot_id: "MyxmMTFjNmM4M2RjMGEzMTk5MDMzNzNiOTlhZTg3MmI5MWY5YWNiODU4",
  tracks: {
    href: "https://api.spotify.com/v1/playlists/32037vlVm5bjcLBU00gkx8/tracks",
    total: 1,
  },
  type: "playlist",
  uri: "spotify:playlist:32037vlVm5bjcLBU00gkx8",
};
