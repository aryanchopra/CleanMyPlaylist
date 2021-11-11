import React from "react";

export default function Login(): JSX.Element {
  const loginHandler = async (): Promise<void> => {
    window.location.href = "http://localhost:8888/api/login";
  };
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-4xl text-white mt-5">Clean My Playlistt</div>
      <button
        className="p-5 rounded-xl bg-green-800 mt-10"
        onClick={loginHandler}
      >
        Login with Spotify
      </button>
    </div>
  );
}
