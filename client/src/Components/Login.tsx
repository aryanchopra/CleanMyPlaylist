import React from "react";

export default function Login(): JSX.Element {
  const loginHandler = async (): Promise<void> => {
    window.location.href = "http://localhost:8888/api/login";
  };
  return (
    <div
      className="h-full font-opensans "
      style={{
        background:
          "radial-gradient(100% 225% at 100% 0%, #FF0000 0%, #000000 100%), linear-gradient(236deg, #00C2FF 0%, #000000 100%), linear-gradient(135deg, #CDFFEB 0%, #CDFFEB 36%, #009F9D 36%, #009F9D 60%, #07456F 60%, #07456F 67%, #0F0A3C 67%, #0F0A3C 100%)",
        backgroundBlendMode: "overlay, hard-light, normal",
      }}
    >
      <div className=" text-left absolute left-10 md:left-44 top-1/3 text-white inline">
        <span className="text-3xl sm:text-4xl md:text-7xl font-extrabold">
          CleanMyPlaylist
        </span>
        <p className="text-lg sm:text-xl font-semibold mt-4">
          Convert your explicit Spotify playlists to <br></br>clean ones in
          seconds.
        </p>
        <button
          className="p-5 mt-5 rounded-xl font-semibold flex items-center justify-between bg-black ring-4 ring-spotify-green hover:ring-green-300"
          onClick={loginHandler}
        >
          <span>Login with Spotify</span>
          <img
            src="Spotify_Icon_RGB_Green.png"
            className="inline ml-3"
            height="30px"
            width="30px"
            alt=""
          />
        </button>
      </div>
    </div>
  );
}
