/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { TMessage, TUser } from "lib/types";
import React from "react";
import TypingSignal from "../../TypingSignal";
import {
  VCheck,
  VDoubleCheck,
  VImageCard,
  VMessagevideoCamera,
} from "../../vectors";

interface IProps {
  contact: TUser;
  lastMessage?: TMessage;
  showMessageCheck?: boolean;
}

const ContactCard = ({ contact, lastMessage, showMessageCheck }: IProps) => {
  return (
    <div className="flex items-center hover:bg-white py-1 px-1 rounded-md cursor-pointer transition-all">
      <img
        src={contact.userProfileUrl}
        alt={contact.username}
        className="w-14 h-14 object-cover rounded-full"
      />
      <div className="flex justify-between w-full px-2">
        <div>
          <p className="font-bold text-dark text-sm">{contact.username}</p>
          <TypingSignal contact={contact}>
            <p className="text-xs pt-1 text-gray-500">
              {lastMessage?.isVideo ? (
                <span className="flex items-center gap-1">
                  <VMessagevideoCamera />
                  video
                </span>
              ) : lastMessage?.isImage ? (
                <span className="flex items-center gap-1">
                  <VImageCard />
                  picture
                </span>
              ) : (
                lastMessage?.message
              )}
            </p>
          </TypingSignal>
        </div>
        {/* {showMessageCheck &&
          (lastMessage?.status.viewed ? (
            <VDoubleCheck className="text-green-500" />
          ) : (
            <VCheck />
          ))} */}
      </div>
    </div>
  );
};

export default ContactCard;
