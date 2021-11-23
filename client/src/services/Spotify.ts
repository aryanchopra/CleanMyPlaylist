import axios, { AxiosResponse } from "axios";
import { cleanSong, playlistSong } from "../Components/PlaylistCard";
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
      if (retry_after) {
        await delay(retry_after);
        return axios.request(error.config);
      }
      console.log(error.response);
    } else if (error.response.status === 401) {
      console.log("Token expired");
      console.log(tokens);
    }
    return Promise.reject(error);
  }
);

type Tokens = {
  accessToken: string;
  refreshToken: string;
  expires_in: Number;
};

let tokens: Tokens | null = null;

const setTokens = (token: Tokens) => {
  console.log("setting tokens", token);
  tokens = token;
};

const getProfile = async (): Promise<SpotifyApi.UserProfileResponse | null> => {
  if (tokens) {
    const res: AxiosResponse = await axios.get(
      "https://api.spotify.com/v1/me/",
      {
        headers: {
          Authorization: `Bearer ${tokens?.accessToken}`,
        },
      }
    );
    return res.data;
  }
  return null;
};

const getPlaylists = async () => {
  let playlists: SpotifyApi.PlaylistObjectSimplified[] = [];
  if (tokens) {
    try {
      const res: AxiosResponse = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
          },
        }
      );
      if (res) {
        const playlistdata: SpotifyApi.ListOfCurrentUsersPlaylistsResponse =
          res.data;

        playlists = playlists.concat(playlistdata.items);
        let calls = Math.ceil(playlistdata.total / playlistdata.limit);
        let next_url = res.data.next;
        while (calls > 1) {
          try {
            const res: AxiosResponse = await axios.get(next_url, {
              headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
              },
            });

            const playlistdata: SpotifyApi.ListOfCurrentUsersPlaylistsResponse =
              res.data;
            next_url = playlistdata.next;
            playlists = playlists.concat(playlistdata.items);
          } catch (err) {
            console.log("error while fetching more playlists");
          }
          calls--;
        }
      }
      return playlists;
    } catch (err) {}
  }
  return null;
};

const getTracks = async (tracksurl: string) => {
  let totalsongs: SpotifyApi.PlaylistTrackObject[] = [];
  try {
    const response: AxiosResponse = await axios.get(tracksurl, {
      headers: {
        Authorization: `Bearer ${tokens?.accessToken}`,
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
              Authorization: `Bearer ${tokens?.accessToken}`,
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
  return null;
};

const findCleanSongs = async (
  trackidsandnames: playlistSong[]
): Promise<cleanSong[]> => {
  //Array of clean versions of songs
  const cleanSongs: cleanSong[] = [];

  for (const track of trackidsandnames) {
    // trackidsandnames.forEach(async (track) => {
    if (track.explicit) {
      try {
        //Search for track in trackidsandnames
        const response: AxiosResponse = await axios.get(
          `https://api.spotify.com/v1/search?q=${track.artist} ${track.name}&type=track`,
          {
            headers: {
              Authorization: `Bearer ${tokens?.accessToken}`,
            },
          }
        );
        const searchResults: SpotifyApi.TrackSearchResponse = response.data;

        //Push the first clean version from the results
        searchResults.tracks.items.some((trackobj) => {
          if (
            !trackobj.explicit &&
            trackobj.artists.some((artist) => artist.name === track.artist)
          ) {
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
      //If track is clean, push as it is
      cleanSongs.push({
        id: track.id,
        name: track.name,
        artist: track.artist,
      });
    }
  }
  return cleanSongs;
};

export default {
  setTokens,
  getProfile,
  getPlaylists,
  getTracks,
  findCleanSongs,
};
