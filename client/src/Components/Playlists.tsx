import axios, { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import PlaylistCard from "./PlaylistCard";
import SpotifyService from "../services/Spotify";
import Modal from "react-modal";
import ProgressBar from "./ProgressBar";

Modal.setAppElement("#root");

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
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[] | null
  >([]);
  const [profile, setProfile] = useState<null | SpotifyApi.UserProfileResponse>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  const [converting, setConverting] = useState<boolean>(false);
  const [progressBarWidth, setProgressBarWidth] = useState<number>(0);
  const [progressBarText, setProgressBarText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const getProfile = async () => {
      const profile = await SpotifyService.getProfile();
      setProfile(profile);
    };
    const getPlaylists = async () => {
      const playlists = await SpotifyService.getPlaylists();
      console.log(playlists);
      setPlaylists(playlists);
    };
    const tokens = getTokens();
    tokens ? setAccessToken(tokens.accessToken) : history.push("/");
    if (!tokens) return;
    SpotifyService.setTokens(tokens);
    getProfile();
    getPlaylists();
    setLoading(false);
  }, []);

  var delete_cookie = function (name: string) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };
  const logoutHandler = (): void => {
    delete_cookie("authInfo");
    history.push("/");
  };

  if (!loading && profile && playlists) {
    return (
      <>
        <div className="h-full overflow-scroll overflow-x-hidden">
          <div className="flex justify-center text-white mt-1">
            Hi {profile.display_name}!{" "}
            <button className="p-4 bg-green-400" onClick={logoutHandler}>
              Logout
            </button>
          </div>
          <div className="flex  justify-center mt-6 ">
            <div className="grid  grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid-rows-2  grid-flow-row w-7/12 gap-3">
              {playlists.map((playlist) => (
                <PlaylistCard
                  playlists={playlists}
                  setPlaylists={setPlaylists}
                  key={playlist.id}
                  userid={profile.id}
                  url={playlist.external_urls.spotify}
                  img={playlist.images[0]?.url}
                  name={playlist.name}
                  tracks={playlist.tracks}
                  token={accessToken}
                  converting={converting}
                  setConverting={setConverting}
                  setProgressBarText={setProgressBarText}
                  setProgressBarWidth={setProgressBarWidth}
                />
              ))}
            </div>
          </div>
        </div>
        <Modal
          className="top-1/3 right-1/3 left-1/3 bottom-1/3 bg-black text-white  absolute"
          isOpen={converting}
          overlayClassName="fixed bg-green-300 bg-opacity-50 top-0 left-0 right-0 bottom-0"
        >
          <div className="flex w-full h-full items-center justify-center flex-col">
            <div>{progressBarText}</div>
            <div className="relative mt-3 w-1/2 pt-1">
              <ProgressBar width={progressBarWidth} />
            </div>
          </div>
        </Modal>
      </>
    );
  } else
    return (
      <div className="text-4xl text-white flex justify-center items-center h-full">
        Loading...
      </div>
    );
}
