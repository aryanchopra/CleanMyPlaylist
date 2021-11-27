import React from "react";

type ProfileProps = {
  profile: SpotifyApi.UserProfileResponse;
  logoutHandler: () => void;
};

const Profile: React.FC<ProfileProps> = ({
  profile,
  logoutHandler,
}): JSX.Element => {
  return (
    <div className="flex justify-center items-center  text-white mt-1">
      {profile.images && (
        <div className=" w-16 h-16 mr-2">
          <img className="rounded-full" src={profile.images[0].url}></img>
        </div>
      )}
      Logged in as&nbsp;
      <a href={profile.external_urls.spotify}>{`${profile.display_name}`}</a>
      <button
        className="py-2 px-4 ml-3 rounded-full bg-spotify-green  hover:bg-green-500 "
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
