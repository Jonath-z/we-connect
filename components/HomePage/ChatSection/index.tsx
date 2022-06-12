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

const ChatSection = () => {
  const { allMessages, userAvatarUrl, username, lastConnexion, online } = user;
  return (
    <div className="flex flex-col">
      <ChatHeader
        userAvatarUrl={userAvatarUrl}
        username={username}
        lastConnexion={lastConnexion}
        online={online}
      />
      <div className="mx-auto flex flex-col w-full py-24">
        {allMessages.map((message, index) => {
          return (
            <div key={index}>
              <MessageCard messages={message} />
              <MessageCard messages={message} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatSection;
