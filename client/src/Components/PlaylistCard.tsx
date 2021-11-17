import axios, { Axios, AxiosResponse } from "axios";
import React, { useState } from "react";

const delay = (sec: number) =>
  new Promise((res: any) => setTimeout(res, sec * 1000));

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 429) {
      console.log("error occ");
      const retry_after = Number(error.response.headers["retry-after"]);
      await delay(retry_after);
      return axios.request(error.config);
    }
    console.log("here");
    return Promise.reject(error);
  }
);
const sampleplaylist = {
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
const sampleTrackClean = {
  album: {
    album_type: "album",
    artists: [
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/6l3HvQ5sa6mXTsMTB19rO5",
        },
        href: "https://api.spotify.com/v1/artists/6l3HvQ5sa6mXTsMTB19rO5",
        id: "6l3HvQ5sa6mXTsMTB19rO5",
        name: "J. Cole",
        type: "artist",
        uri: "spotify:artist:6l3HvQ5sa6mXTsMTB19rO5",
      },
    ],
    external_urls: {
      spotify: "https://open.spotify.com/album/7amgMBFiedsknMot03NgQ4",
    },
    href: "https://api.spotify.com/v1/albums/7amgMBFiedsknMot03NgQ4",
    id: "7amgMBFiedsknMot03NgQ4",
    images: [
      {
        height: 640,
        url: "https://i.scdn.co/image/ab67616d0000b27398174a97206614a1e1cf8631",
        width: 640,
      },
      {
        height: 300,
        url: "https://i.scdn.co/image/ab67616d00001e0298174a97206614a1e1cf8631",
        width: 300,
      },
      {
        height: 64,
        url: "https://i.scdn.co/image/ab67616d0000485198174a97206614a1e1cf8631",
        width: 64,
      },
    ],
    name: "The Off-Season",
    release_date: "2021-05-14",
    release_date_precision: "day",
    total_tracks: 12,
    type: "album",
    uri: "spotify:album:7amgMBFiedsknMot03NgQ4",
  },
  artists: [
    {
      external_urls: {
        spotify: "https://open.spotify.com/artist/6l3HvQ5sa6mXTsMTB19rO5",
      },
      href: "https://api.spotify.com/v1/artists/6l3HvQ5sa6mXTsMTB19rO5",
      id: "6l3HvQ5sa6mXTsMTB19rO5",
      name: "J. Cole",
      type: "artist",
      uri: "spotify:artist:6l3HvQ5sa6mXTsMTB19rO5",
    },
    {
      external_urls: {
        spotify: "https://open.spotify.com/artist/5f7VJjfbwm532GiveGC0ZK",
      },
      href: "https://api.spotify.com/v1/artists/5f7VJjfbwm532GiveGC0ZK",
      id: "5f7VJjfbwm532GiveGC0ZK",
      name: "Lil Baby",
      type: "artist",
      uri: "spotify:artist:5f7VJjfbwm532GiveGC0ZK",
    },
  ],
  disc_number: 1,
  duration_ms: 218210,
  episode: false,
  explicit: false,
  external_ids: {
    isrc: "QMJMT2103643",
  },
  external_urls: {
    spotify: "https://open.spotify.com/track/36HEbeiwJ2FkLHgBv0qEfV",
  },
  href: "https://api.spotify.com/v1/tracks/36HEbeiwJ2FkLHgBv0qEfV",
  id: "36HEbeiwJ2FkLHgBv0qEfV",
  is_local: false,
  name: "p r i d e . i s . t h e . d e v i l (with Lil Baby)",
  popularity: 57,
  preview_url:
    "https://p.scdn.co/mp3-preview/9264a542e793f1f019747f5d358e5f6700f2b7ce?cid=f9c23324a99a4d24be742d3953c46b7a",
  track: true,
  track_number: 7,
  type: "track",
  uri: "spotify:track:36HEbeiwJ2FkLHgBv0qEfV",
};
const sampleTrack = {
  album: {
    album_type: "album",
    artists: [
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/6l3HvQ5sa6mXTsMTB19rO5",
        },
        href: "https://api.spotify.com/v1/artists/6l3HvQ5sa6mXTsMTB19rO5",
        id: "6l3HvQ5sa6mXTsMTB19rO5",
        name: "J. Cole",
        type: "artist",
        uri: "spotify:artist:6l3HvQ5sa6mXTsMTB19rO5",
      },
    ],
    external_urls: {
      spotify: "https://open.spotify.com/album/4JAvwK4APPArjIsOdGoJXX",
    },
    href: "https://api.spotify.com/v1/albums/4JAvwK4APPArjIsOdGoJXX",
    id: "4JAvwK4APPArjIsOdGoJXX",
    images: [
      {
        height: 640,
        url: "https://i.scdn.co/image/ab67616d0000b27310e6745bb2f179dd3616b85f",
        width: 640,
      },
      {
        height: 300,
        url: "https://i.scdn.co/image/ab67616d00001e0210e6745bb2f179dd3616b85f",
        width: 300,
      },
      {
        height: 64,
        url: "https://i.scdn.co/image/ab67616d0000485110e6745bb2f179dd3616b85f",
        width: 64,
      },
    ],
    name: "The Off-Season",
    release_date: "2021-05-14",
    release_date_precision: "day",
    total_tracks: 12,
    type: "album",
    uri: "spotify:album:4JAvwK4APPArjIsOdGoJXX",
  },
  artists: [
    {
      external_urls: {
        spotify: "https://open.spotify.com/artist/6l3HvQ5sa6mXTsMTB19rO5",
      },
      href: "https://api.spotify.com/v1/artists/6l3HvQ5sa6mXTsMTB19rO5",
      id: "6l3HvQ5sa6mXTsMTB19rO5",
      name: "J. Cole",
      type: "artist",
      uri: "spotify:artist:6l3HvQ5sa6mXTsMTB19rO5",
    },
    {
      external_urls: {
        spotify: "https://open.spotify.com/artist/5f7VJjfbwm532GiveGC0ZK",
      },
      href: "https://api.spotify.com/v1/artists/5f7VJjfbwm532GiveGC0ZK",
      id: "5f7VJjfbwm532GiveGC0ZK",
      name: "Lil Baby",
      type: "artist",
      uri: "spotify:artist:5f7VJjfbwm532GiveGC0ZK",
    },
  ],
  disc_number: 1,
  duration_ms: 218210,
  episode: false,
  explicit: true,
  external_ids: {
    isrc: "QMJMT2103642",
  },
  external_urls: {
    spotify: "https://open.spotify.com/track/5W8jRrZ6tWrTrqnKRtIQBf",
  },
  href: "https://api.spotify.com/v1/tracks/5W8jRrZ6tWrTrqnKRtIQBf",
  id: "5W8jRrZ6tWrTrqnKRtIQBf",
  is_local: false,
  name: "p r i d e . i s . t h e . d e v i l (with Lil Baby)",
  popularity: 80,
  preview_url:
    "https://p.scdn.co/mp3-preview/31341796f6942a53b4a9f230343549178c0c2d34?cid=f9c23324a99a4d24be742d3953c46b7a",
  track: true,
  track_number: 7,
  type: "track",
  uri: "spotify:track:5W8jRrZ6tWrTrqnKRtIQBf",
};

export interface PlaylistCardProps {
  url: string;
  img: string;
  name: string;
  tracks: {
    href: string;
    total: number;
  };
  token: string;
}

export interface cleanSong {
  id: string;
  name: string;
  artist?: string;
}

export interface playlistSong extends cleanSong {
  explicit: boolean;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  url,
  img,
  name,
  tracks,
  token,
}) => {
  const [converting, setConverting] = useState<boolean>(true);
  const getTracks = async (tracksurl: string) => {
    let totalsongs: SpotifyApi.PlaylistTrackObject[] = [];
    try {
      const response: AxiosResponse = await axios.get(tracksurl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const songs: SpotifyApi.PlaylistTrackResponse = response.data;
      totalsongs = totalsongs.concat(songs.items);
      let calls = Math.ceil(songs.total / songs.limit);
      if (calls > 1) {
        let next_url = songs.next;
        while (calls > 1) {
          if (next_url) {
            let response: AxiosResponse = await axios.get(next_url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            let moresongs: SpotifyApi.PlaylistTrackResponse = response.data;
            totalsongs = totalsongs.concat(moresongs.items);
            next_url = moresongs.next;
            calls--;
          }
        }
      }

      return totalsongs;
    } catch (err) {}
  };

  const convertPlaylist = async (tracks: string): Promise<void> => {
    setConverting(true);
    const songs = await getTracks(tracks);
    const trackidsandnames: playlistSong[] = [];
    if (songs) {
      songs.forEach((trackobj) => {
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
    const cleanSongs: cleanSong[] = [];

    console.log(trackidsandnames);
    for (const track of trackidsandnames) {
      // trackidsandnames.forEach(async (track) => {
      if (track.explicit) {
        try {
          const response: AxiosResponse = await axios.get(
            `https://api.spotify.com/v1/search?q=${track.artist} ${track.name}&type=track`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const searchResults: SpotifyApi.TrackSearchResponse = response.data;
          searchResults.tracks.items.some((trackobj) => {
            if (!trackobj.explicit) {
              cleanSongs.push({
                id: trackobj.id,
                name: trackobj.name,
                artist: trackobj.artists[0].name,
              });
              return true;
            }
          });
        } catch (err) {
          console.log("Error occured while searching");
        }
      } else {
        cleanSongs.push({
          id: track.id,
          name: track.name,
          artist: track.artist,
        });
      }
    }
    console.log(cleanSongs);
  };
  return (
    <div className="w-full h-72 rounded-md border-green-600 bg-black text-white border-2 p-4 flex flex-col items-center overflow-hidden">
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
        onClick={() => convertPlaylist(tracks.href)}
      >
        {" "}
        Convert{" "}
      </button>
    </div>
  );
};

export default PlaylistCard;
