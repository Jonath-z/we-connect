import React, { ChangeEventHandler, useState } from "react";
import { VClose, VMenu, VSearch } from "../_modules/vectors";

const Header = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const onInputSeachFocus = () => {
    setSearchFocused(true);
  };

  const onInputSearchBlur = () => {
    setSearchFocused(false);
  };
  const onCleanSearch = () => {
    setSearchValue("");
  };
  const onSearhChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;
    setSearchValue(value);
  };
  return (
    <div className="flex justify-center mobilemd:justify-between items-center">
      <div className="cursor-pointer flex items-center">
        <button>
          <VMenu className="text-xl text-light" />
        </button>
        <p className="hidden mobilemd:block font-bold px-2">We connect</p>
      </div>
      <div className="hidden mobilemd:block">
        <VSearch />
      </div>
      <div className="w-full flex bg-gray-100 mx-5 py-1 px-3  items-center mobilemd:hidden">
        <input
          onFocus={onInputSeachFocus}
          onBlur={onInputSearchBlur}
          onChange={onSearhChange}
          type="text"
          placeholder="searh"
          className="w-full bg-transparent outline-none"
          value={searchValue}
        />
        {searchValue && (
          <VClose
            onClick={onCleanSearch}
            className="text-gray-500 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default Header;
