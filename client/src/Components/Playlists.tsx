import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router";
import PlaylistCard from "./PlaylistCard";
import SpotifyService from "../services/Spotify";
import Profile from "./Profile";
import Modal from "react-modal";
import ProgressBar from "./ProgressBar";
import SearchBar from "./SearchBar";
import Loader from "./Loader";
import { useDebouncedValue } from "../Hooks/useDebouncedValue";
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

  const [playliststoshow, setPLaylistsToShow] = useState<
    SpotifyApi.PlaylistObjectSimplified[] | null
  >(playlists);

  const [profile, setProfile] = useState<null | SpotifyApi.UserProfileResponse>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  const [converting, setConverting] = useState<boolean>(false);

  const [progressBarWidth, setProgressBarWidth] = useState<number>(0);

  const [progressBarText, setProgressBarText] = useState<string>("");

  const [searchValue, setSearchValue] = useState<string>("");

  const debouncedSearchValue = useDebouncedValue(searchValue, 500);

  const history = useHistory();

  useEffect(() => {
    const getProfile = async () => {
      const profile = await SpotifyService.getProfile();
      setProfile(profile);
    };
    const getPlaylists = async () => {
      const playlists = await SpotifyService.getPlaylists();
      setPlaylists(playlists);
    };
    const tokens = getTokens();
    tokens ? setAccessToken(tokens.accessToken) : history.push("/");
    if (!tokens) return;
    SpotifyService.setTokens(tokens);
    getProfile();
    getPlaylists();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    setPLaylistsToShow(playlists);
  }, [playlists]);

  useEffect(() => {
    searchHandler(debouncedSearchValue);
  }, [debouncedSearchValue]);

  let delete_cookie = function (name: string) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };
  const logoutHandler = (): void => {
    delete_cookie("authInfo");
    history.push("/");
  };

  // const debounce = (fn: Function, delay: number) => {
  //   let timer: number | undefined;
  //   return function (this: any, args: any) {
  //     let context = this;
  //     if (timer) clearTimeout(timer);
  //     setTimeout(() => {
  //       fn.apply(context, arguments);
  //     }, delay);
  //   };
  // };

  const searchHandler = (input: string) => {
    console.log("searching");
    const searchresults = playlists?.filter((playlist) =>
      playlist.name.includes(input)
    );
    if (searchresults) setPLaylistsToShow(searchresults);
  };

  if (!loading && profile && playliststoshow && playlists) {
    return (
      <>
        <div className="h-full overflow-scroll overflow-x-hidden">
          <Profile profile={profile} logoutHandler={logoutHandler} />
          <SearchBar setSearchValue={setSearchValue} />
          <div className="flex  justify-center mt-6 ">
            <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-rows-2  grid-flow-row w-7/12 gap-3">
              {playliststoshow.map((playlist) => (
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
          className="top-1/3 right-1/3 left-1/3 bottom-1/3 bg-black rounded-md text-white  absolute"
          isOpen={converting}
          overlayClassName="fixed bg-green-300 bg-opacity-50 top-0 left-0 right-0 bottom-0 "
        >
          <div className="flex w-full h-full items-center justify-center flex-col">
            <div className="text-center">{progressBarText}</div>
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
        <Loader />
      </div>
    );
}
