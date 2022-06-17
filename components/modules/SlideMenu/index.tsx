/* eslint-disable @next/next/no-img-element */
import React from "react";
import { user } from "components/assets/dummy_data/user";
import { VUser, VUserplus } from "../_modules/vectors";
import useClickOutside from "lib/hooks/useClickOutside";

interface IProps {
  setIsSlideMenu: any;
  isSlideMenu: boolean;
}

const SlideMenu = ({ setIsSlideMenu, isSlideMenu }: IProps) => {
  const { username, userAvatarUrl } = user;
  const ref = useClickOutside(() => setIsSlideMenu(false));
  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 h-full w-full bg-dark bg-opacity-50 backdrop-blur ${
        isSlideMenu
          ? "translate-x-0 duration-200"
          : "-translate-x-[2000px] duration-200"
      }`}
    >
      <div className="w-[80%] bg-light text-dark h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center border-b border-gray-300 py-5 mx-3">
            <img
              src={userAvatarUrl}
              alt={username}
              className="w-16 h-16 rounded-full object-cover"
            />
            <p className="px-3 font-bold text-sm">{username}</p>
          </div>
          <div className="mt-5 mx-3">
            <ul>
              <li className="flex items-center">
                <VUser className="text-2xl" />{" "}
                <span className="px-2">Profile</span>
              </li>
              <li className="flex items-center my-5">
                <VUserplus className="text-2xl" />{" "}
                <span className="px-2">Invite Friends</span>
              </li>
            </ul>
          </div>
        </div>
        <button className="border border-gray-300 py-3 mx-3 my-3 rounded-full">
          Log out
        </button>
      </div>
    </div>
  );
};

export default SlideMenu;
