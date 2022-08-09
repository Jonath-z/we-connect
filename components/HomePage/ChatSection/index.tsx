/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import MessageCard from "components/modules/_modules/Cards/MessageCard";
import ChatHeader from "./ChatHeader";
import InputMessage from "components/modules/InputMessage";
import ChatMenu from "./ChatMenu";
import { useRecoilValue } from "recoil";
import { messageAtom, openedChatAtom, userAccountAtom } from "lib/atoms";
import { TUser } from "lib/types";

interface IProps {
  onRedirectToChat: () => void;
}

const ChatSection = ({ onRedirectToChat }: IProps) => {
  const [isChatMenuVisible, setIsChatMenuVisible] = useState(false);
  const openedChat = useRecoilValue(openedChatAtom);
  const userAccount = useRecoilValue(userAccountAtom);

  const onToggleChatMenu = () => {
    setIsChatMenuVisible(!isChatMenuVisible);
  };

  const messages = useRecoilValue(messageAtom);

  return (
    <div className="flex flex-col">
      <ChatHeader
        contact={openedChat.contact as TUser}
        onRedirectToChat={onRedirectToChat}
        onToggleChatMenu={onToggleChatMenu}
        isChatMenuVisible={isChatMenuVisible}
      />
      <div className="mx-auto flex flex-col w-full py-24 mobile:bg-light min-h-screen mobile:px-2">
        {messages?.map((message, index) => {
          return (
            <div key={index}>
              <MessageCard
                messages={message}
                contact={openedChat.contact as TUser}
              />
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
