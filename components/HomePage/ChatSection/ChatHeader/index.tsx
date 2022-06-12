/* eslint-disable @next/next/no-img-element */
import {
  VDotVerticalMenu,
  VPhone,
  VSearch,
  VVideo,
} from "components/modules/_modules/vectors";
import { onlineMarker } from "components/static";
import React from "react";

interface IProps {
  userAvatarUrl: string;
  username: string;
  online: boolean;
  lastConnexion: string;
}

const ChatHeader = ({
  userAvatarUrl,
  username,
  online,
  lastConnexion,
}: IProps) => {
  return (
    <div className="py-5 bg-light fixed right-0 w-3/5 pr-5">
      <div className="flex justify-between items-center bg-white px-5 py-1 rounded-md">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={userAvatarUrl}
              alt={username}
              className="w-12 h-12 object-cover rounded-full"
            />
            <img
              src={onlineMarker.src}
              alt={username}
              className={`w-3 h-3 object-cover rounded-full absolute bottom-0 right-0 ${
                !online && "hidden"
              }`}
            />
          </div>
          <div className="px-2">
            <p className="font-bold">{username}</p>
            <p className="text-xs text-gray-500">{lastConnexion}</p>
          </div>
        </div>
        <div>
          <ul className="flex">
            <li className="mx-2 cursor-pointer">
              <VSearch />
            </li>
            <li className="mx-2 cursor-pointer">
              <VPhone />
            </li>
            <li className="mx-2 cursor-pointer">
              <VVideo />
            </li>
            <li className="mx-2 cursor-pointer">
              <VDotVerticalMenu />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
