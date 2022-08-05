/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { TMessage } from "lib/types";
import React from "react";
import {
  VCheck,
  VDoubleCheck,
  VImageCard,
  VMessagevideoCamera,
} from "../../vectors";

type Contact = {
  id: string;
  username: string;
  userAvatartUrl: string;
  userCoverUrl?: string;
};

interface IProps {
  contact: Contact;
  lastMessage?: TMessage;
  showMessageCheck?: boolean;
}

const ContactCard = ({ contact, lastMessage, showMessageCheck }: IProps) => {
  const { username, userAvatartUrl } = contact;

  return (
    <div className="flex items-center hover:bg-white py-1 px-1 rounded-md cursor-pointer transition-all">
      <img
        src={userAvatartUrl}
        alt={username}
        className="w-14 h-14 object-cover rounded-full"
      />
      <div className="flex justify-between w-full px-2">
        <div>
          <p className="font-bold text-dark text-sm">{username}</p>
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
