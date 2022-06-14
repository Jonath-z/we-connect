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
import ChatHeader from "./ChatHeader";
import InputMessage from "components/modules/InputMessage";

interface IProps {
  onRedirectToChat: () => void;
}

const ChatSection = ({ onRedirectToChat }: IProps) => {
  const { allMessages, userAvatarUrl, username, lastConnexion, online } = user;
  return (
    <div className="flex flex-col">
      <ChatHeader
        userAvatarUrl={userAvatarUrl}
        username={username}
        lastConnexion={lastConnexion}
        online={online}
        onRedirectToChat={onRedirectToChat}
      />
      <div className="mx-auto flex flex-col w-full py-24 mobile:bg-light mobile:px-2">
        {allMessages.map((message, index) => {
          return (
            <div key={index}>
              <MessageCard messages={message} />
              <MessageCard messages={message} />
            </div>
          );
        })}
      </div>
      <InputMessage />
    </div>
  );
};

export default ChatSection;
