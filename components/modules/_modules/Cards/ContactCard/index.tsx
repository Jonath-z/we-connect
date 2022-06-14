/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { VCheck, VDoubleCheck } from "../../vectors";

type Contact = {
  id: string;
  username: string;
  userAvatartUrl: string;
  userCoverUrl: string;
};

type LastMessage = {
  senderUsername: string;
  senderId: string;
  receiverUsername: string;
  receiverId: string;
  message: string;
  date: string;
  time: string;
  status: {
    viewed: boolean;
  };
};

interface IProps {
  contact: Contact;
  lastMessage: LastMessage;
}

const ContactCard = ({ contact, lastMessage }: IProps) => {
  const { username, userAvatartUrl } = contact;
  const { message, status } = lastMessage;
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
          <p className="text-xs pt-1 text-gray-500">{message}</p>
        </div>
        {status.viewed ? (
          <VDoubleCheck className="text-green-500" />
        ) : (
          <VCheck />
        )}
      </div>
    </div>
  );
};

export default ContactCard;
