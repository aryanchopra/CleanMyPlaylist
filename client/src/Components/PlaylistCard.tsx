import axios from "axios";
import React from "react";

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

type PlaylistCardProps = {
  url: string;
  img: string;
  name: string;
  tracks: {
    href: string;
    total: number;
  };
  token: string;
};

type explicitSong = {
  id: number;
  name: string;
};

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  url,
  img,
  name,
  tracks,
  token,
}) => {
  const convertPlaylist = async (tracks: string): Promise<void> => {
    const songs = await axios.get(tracks, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(songs);
    const trackidsandnames: explicitSong[] = [];
    songs.data.items.forEach((trackobj: any) => {
      if (!trackobj.is_local) {
        trackidsandnames.push({
          id: trackobj.track.id,
          name: `${trackobj.track.artists[0].name} ${trackobj.track.name}`,
        });
      }
    });
    console.log(trackidsandnames);
    const cleanSongs: any = [];
    // trackidsandnames.forEach(async (explicittrack: explicitSong) => {
    //   const searchResults: any = await axios.get(
    //     `https://api.spotify.com/v1/search?q=${explicittrack.name}&type=track`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   console.log(searchResults.data);
    // searchResults.data.tracks.items.some((trackobj: any) => {
    //   if (!trackobj.explicit) {
    //     console.log(trackobj);
    //     return true;
    //   }
    // });
    // }
    // );
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
