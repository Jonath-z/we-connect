/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { user } from "components/assets/dummy_data/user";
import MessageCard from "components/modules/_modules/Cards/MessageCard";
import ChatHeader from "./ChatHeader";
import InputMessage from "components/modules/InputMessage";
import ChatMenu from "./ChatMenu";
import useGunMessages from "lib/hooks/useGunMessages";
import { socket } from "lib/contexts/CallContext";

interface IProps {
  onRedirectToChat: () => void;
}

const ChatSection = ({ onRedirectToChat }: IProps) => {
  const { userAvatarUrl, username, lastConnexion, online } = user;
  const [isChatMenuVisible, setIsChatMenuVisible] = useState(false);
  const [typingMessageSignal, setTypingMessageSignal] = useState({
    from: "",
    to: "",
    isTyping: false,
  });

  const onToggleChatMenu = () => {
    setIsChatMenuVisible(!isChatMenuVisible);
  };

  useEffect(() => {
    socket.on("getTypingMessageSignal", (data) => {
      if (data.from === "John Doe" && data.to === "John Doe")
        setTypingMessageSignal({
          from: data.from,
          to: data.to,
          isTyping: data.isTyping,
        });
    });
  });

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

        {typingMessageSignal.isTyping && (
          <p className="bg-gray-300 w-fit px-2 py-2 rounded-t-xl rounded-br-xl text-xs">
            typing ...
          </p>
        )}
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
