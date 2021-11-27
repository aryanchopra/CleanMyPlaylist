import React from "react";

type SearchBarProps = {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar: React.FC<SearchBarProps> = ({ setSearchValue }) => {
  return (
    <div className="flex  justify-center">
      <div className="flex md:flex-row flex-col w-7/12  justify-start md:justify-between items-center mt-5">
        <img
          className=""
          src="Spotify_Logo_RGB_Green.png"
          width="200px"
          alt=""
        />
        <div className="text-white font-opensans text-4xl font-extrabold">
          Your playlists
        </div>
        <input
          type="text"
          className="border-green-500 rounded-md md:mt-0 mt-3 hover:border-green-200 border-2 p-1 focus:bg-gray-200 focus:border-green-200"
          placeholder="Search playlist"
          onChange={(e) => setSearchValue(e.target.value)}
        ></input>
      </div>
    </div>
  );
};

export default SearchBar;
