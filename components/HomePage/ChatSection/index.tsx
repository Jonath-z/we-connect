/* eslint-disable @next/next/no-img-element */
import React from "react";
import { user } from "components/assets/dummy_data/user";
import {
  VDotVerticalMenu,
  VPhone,
  VSearch,
  VVideo,
} from "components/modules/_modules/vectors";
import MessageCard from "components/modules/_modules/Cards/MessageCard";
import { onlineMarker } from "components/static";

const ChatSection = () => {
  const { allMessages, userAvatarUrl, username, lastConnexion, online } = user;
  return (
    <div>
      <div className="w-full flex justify-between items-center mt-5 bg-white px-5 py-1 rounded-md">
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
      <div className="mt-5 mx-auto flex flex-col">
        {allMessages.map((message, index) => {
          return (
            <div key={index}>
              <MessageCard messages={message} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatSection;
