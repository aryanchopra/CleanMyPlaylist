import React from "react";

type SearchBarProps = {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar: React.FC<SearchBarProps> = ({ setSearchValue }) => {
  return (
    <div className="flex justify-center">
      <div className="flex  w-7/12 items-center mt-5">
        <input
          type="text"
          className="border-green-500 rounded-md hover:border-green-200 border-2 p-1 focus:bg-gray-200 focus:border-green-200"
          placeholder="Search playlist"
          onChange={(e) => setSearchValue(e.target.value)}
        ></input>
      </div>
    </div>
  );
};

export default SearchBar;
