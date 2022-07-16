/* eslint-disable @next/next/no-img-element */
import {
  VArrowLeft,
  VClose,
  VDotVerticalMenu,
  VPhone,
  VSearch,
  VVideo,
} from "components/modules/_modules/vectors";
import { onlineMarker } from "components/static";
import { openCallRoomAtom } from "lib/atoms";
import React from "react";
import { useSetRecoilState } from "recoil";

interface IProps {
  userAvatarUrl: string;
  username: string;
  online: boolean;
  lastConnexion: string;
  isChatMenuVisible: boolean;
  onRedirectToChat: () => void;
  onToggleChatMenu: () => void;
}

const ChatHeader = ({
  userAvatarUrl,
  username,
  online,
  lastConnexion,
  isChatMenuVisible,
  onRedirectToChat,
  onToggleChatMenu,
}: IProps) => {
  const openCallRoom = useSetRecoilState(openCallRoomAtom);
  return (
    <div className="py-5 bg-light fixed right-0 w-3/5 pr-5 mobile:p-0 mobile:w-full">
      <div className="flex justify-between items-center bg-white px-5 mobile:px-1 py-1 rounded-md mobile:rounded-none">
        <div className="flex items-center">
          <button
            onClick={onRedirectToChat}
            className="hidden mobile:block px-2"
          >
            <VArrowLeft />
          </button>
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
            <li
              onClick={() => openCallRoom(true)}
              role="button"
              onKeyDown={() => null}
              className="mx-2 cursor-pointer"
            >
              <VVideo />
            </li>
            <li className="mx-2 cursor-pointer" onClick={onToggleChatMenu}>
              {isChatMenuVisible ? <VClose /> : <VDotVerticalMenu />}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
