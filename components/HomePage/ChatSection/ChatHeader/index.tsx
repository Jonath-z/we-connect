/* eslint-disable @next/next/no-img-element */
import TypingSignal from "components/modules/_modules/TypingSignal";
import {
  VArrowLeft,
  VClose,
  VDotVerticalMenu,
  VPhone,
  VSearch,
  VVideo,
} from "components/modules/_modules/vectors";
import { onlineMarker } from "components/static";
import { userAccountAtom } from "lib/atoms";
import { useCallContext } from "lib/contexts/CallContext";
import { useMessage } from "lib/contexts/MessageContext";
import { TUser } from "lib/types";
import React, { useCallback, useMemo } from "react";
import { useRecoilValue } from "recoil";

interface IProps {
  contact: TUser;
  isChatMenuVisible: boolean;
  onRedirectToChat: () => void;
  onToggleChatMenu: () => void;
}

const ChatHeader = ({
  contact,
  isChatMenuVisible,
  onRedirectToChat,
  onToggleChatMenu,
}: IProps) => {
  const { requestCall } = useCallContext();
  const userAccount = useRecoilValue(userAccountAtom);

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
              src={contact.userProfileUrl}
              alt={contact.username}
              className="w-12 h-12 object-cover rounded-full"
            />
            <img
              src={onlineMarker.src}
              alt={contact.username}
              className={`w-3 h-3 object-cover rounded-full absolute bottom-0 right-0 ${
                !contact.online && "hidden"
              }`}
            />
          </div>
          <div className="px-2">
            <p className="font-bold">{contact.username}</p>
            <TypingSignal contact={contact}>
              <p className="text-xs text-gray-500">
                Last connection at 10:50am
              </p>
            </TypingSignal>
          </div>
        </div>
        <div>
          <ul className="flex">
            <li className="mx-2 cursor-pointer">
              <VSearch />
            </li>
            <li
              onClick={() => requestCall("audio", contact, userAccount!)}
              role="button"
              onKeyDown={() => null}
              className="mx-2 cursor-pointer"
            >
              <VPhone />
            </li>
            <li
              onClick={() => requestCall("video", contact, userAccount!)}
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
