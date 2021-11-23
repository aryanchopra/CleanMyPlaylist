import axios, { Axios, AxiosResponse } from "axios";
import React, { useState } from "react";
import SpotifyService from "../services/Spotify";
export interface PlaylistCardProps {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  setPlaylists: React.Dispatch<
    React.SetStateAction<SpotifyApi.PlaylistObjectSimplified[] | null>
  >;
  url: string;
  userid: string;
  img: string;
  name: string;
  tracks: {
    href: string;
    total: number;
  };
  token: string;
  converting: boolean;
  setConverting: React.Dispatch<React.SetStateAction<boolean>>;
  setProgressBarText: React.Dispatch<React.SetStateAction<string>>;
  setProgressBarWidth: React.Dispatch<React.SetStateAction<number>>;
}

export interface cleanSong {
  id: string;
  name: string;
  artist?: string;
}

export interface playlistSong extends cleanSong {
  explicit: boolean;
}

const delay = (sec: number) =>
  new Promise((res: any) => setTimeout(res, sec * 1000));

const getNonLocalSongsFromPlaylist = (
  songs: SpotifyApi.PlaylistTrackObject[] | null
): playlistSong[] => {
  const trackidsandnames: playlistSong[] = [];
  if (songs) {
    songs.forEach((trackobj) => {
      //Push non local tracks to trackidsandnames
      if (!trackobj.is_local) {
        trackidsandnames.push({
          id: trackobj.track.id,
          artist: trackobj.track.artists[0].name,
          name: trackobj.track.name,
          explicit: trackobj.track.explicit,
        });
      }
    });
  }

  return trackidsandnames;
};

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  playlists,
  setPlaylists,
  url,
  img,
  userid,
  name,
  tracks,
  token,
  setConverting,
  converting,
  setProgressBarText,
  setProgressBarWidth,
}) => {
  const convertPlaylist = async (
    playlisttracksurl: string,
    playlistname: string,
    userid: string
  ): Promise<void> => {
    console.log(playlists);
    setConverting(true);
    setProgressBarWidth(0);
    setProgressBarText("Fetching all songs...");
    await delay(2);
    //Get all tracks of the playlist
    const songs = await SpotifyService.getTracks(playlisttracksurl);
    setProgressBarWidth(20);
    const trackidsandnames = getNonLocalSongsFromPlaylist(songs);
    setProgressBarText("Finding clean versions...");
    const cleanSongs: cleanSong[] = await SpotifyService.findCleanSongs(
      trackidsandnames
    );
    setProgressBarWidth(60);

    setProgressBarText("Creating new playlists...");
    //Create new playlist
    const response: AxiosResponse = await axios.post(
      `https://api.spotify.com/v1/users/${userid}/playlists`,
      {
        name: `${playlistname.substring(0, 90)} - Clean`,
        public: true,
        description: "Cleaned using CleanMyPlaylist",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const newplaylist: SpotifyApi.CreatePlaylistResponse = response.data;
    console.log(newplaylist);
    const newplaylistid = newplaylist.id;
    setProgressBarWidth(70);
    setProgressBarText("Adding clean songs to playlist...");
    const totaluriarrays = Math.ceil(cleanSongs.length / 100);
    const uriarrays: Array<{ id: string }>[] = [];
    for (let i = 0; i < totaluriarrays; i++) {
      uriarrays[i] = cleanSongs
        .slice(i * 100, (i + 1) * 100)
        .map((cleansong) => {
          return { id: cleansong.id };
        });
    }
    setProgressBarWidth(80);
    for (const uri of uriarrays) {
      const response2: AxiosResponse = await axios.post(
        `https://api.spotify.com/v1/playlists/${newplaylistid}/tracks`,
        {
          uris: uri.map((track) => `spotify:track:${track.id}`),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    setProgressBarWidth(100);
    await delay(5);
    setPlaylists([newplaylist, ...playlists]);
    setConverting(false);
  };
  return (
    <>
      <div className="w-full h-72 rounded-md hover:border-green-200 border-green-600 bg-black text-white border-2 p-4 flex flex-col items-center overflow-hidden">
        <a target="_blank" href={url}>
          <img src={img} style={{ height: "127px", width: "127px" }} />
        </a>
        <p>
          <a target="_blank" href={url}>
            {name.substr(0, 14) + (name.length > 17 ? "..." : "")}
          </a>
        </p>
        <p className="self-start">
          {tracks.total} {tracks.total > 1 ? "tracks" : "track"}
        </p>
        <button
          className="p-2 rounded-l-3xl rounded-r-3xl bg-green-600"
          onClick={() => convertPlaylist(tracks.href, name, userid)}
        >
          {" "}
          Convert{" "}
        </button>
      </div>
    </>
  );
};

export default PlaylistCard;
