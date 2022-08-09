/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { user } from "components/assets/dummy_data/user";
import MessageCard from "components/modules/_modules/Cards/MessageCard";
import ChatHeader from "./ChatHeader";
import InputMessage from "components/modules/InputMessage";
import ChatMenu from "./ChatMenu";
import useGunMessages from "lib/hooks/useGunMessages";
import { socket } from "lib/contexts/CallContext";
import { useRecoilValue } from "recoil";
import { openedChatAtom } from "lib/atoms";
import { TUser } from "lib/types";

interface IProps {
  onRedirectToChat: () => void;
}

const ChatSection = ({ onRedirectToChat }: IProps) => {
  const [isChatMenuVisible, setIsChatMenuVisible] = useState(false);
  const openedChat = useRecoilValue(openedChatAtom);

  const onToggleChatMenu = () => {
    setIsChatMenuVisible(!isChatMenuVisible);
  };

  const messages = useGunMessages();

  return (
    <div className="flex flex-col">
      <ChatHeader
        contact={openedChat.contact as TUser}
        onRedirectToChat={onRedirectToChat}
        onToggleChatMenu={onToggleChatMenu}
        isChatMenuVisible={isChatMenuVisible}
      />
      <div className="mx-auto flex flex-col w-full py-24 mobile:bg-light min-h-screen mobile:px-2">
        {messages.map((message, index) => {
          return (
            <div key={index}>
              <MessageCard messages={message} />
            </div>
          );
        })}
      </div>
      <ChatMenu
        isChatMenuVisible={isChatMenuVisible}
        setIsChatMenuVisible={setIsChatMenuVisible}
      />
      <InputMessage contact={openedChat.contact!} />
    </div>
  );
};

export default ChatSection;
