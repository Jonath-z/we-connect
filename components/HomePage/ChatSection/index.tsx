/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { user } from "components/assets/dummy_data/user";
import MessageCard from "components/modules/_modules/Cards/MessageCard";
import ChatHeader from "./ChatHeader";
import InputMessage from "components/modules/InputMessage";
import ChatMenu from "./ChatMenu";
import useGunMessages from "lib/hooks/useGunMessages";

interface IProps {
  onRedirectToChat: () => void;
}

const ChatSection = ({ onRedirectToChat }: IProps) => {
  const { userAvatarUrl, username, lastConnexion, online } = user;
  const [isChatMenuVisible, setIsChatMenuVisible] = useState(false);

  const onToggleChatMenu = () => {
    setIsChatMenuVisible(!isChatMenuVisible);
  };

  const messages = useGunMessages();

  return (
    <div className="flex flex-col">
      <ChatHeader
        userAvatarUrl={userAvatarUrl}
        username={username}
        lastConnexion={lastConnexion}
        online={online}
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
      <InputMessage />
    </div>
  );
};

export default ChatSection;
