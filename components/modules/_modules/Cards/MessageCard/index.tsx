import { user } from "components/assets/dummy_data/user";
import React from "react";

type Message = {
  senderUsername: string;
  senderId: string;
  receiverUsername: string;
  receiverId: string;
  message: string;
  date: string;
  time: string;
};

interface IProps {
  messages: Message;
}

const MessageCard = ({ messages }: IProps) => {
  const { message, time, senderId } = messages;
  const { id } = user;
  return (
    <div
      className={`my-2 py-2 px-5 w-fit max-w-xl mobile:max-w-sm transition-all break-words flex flex-col ${
        id === senderId
          ? "bg-white rounded-t-xl rounded-br-xl"
          : "bg-dark text-light ml-auto  rounded-t-xl rounded-bl-xl"
      }`}
    >
      <p className="text-sm">{message}</p>
      <p className="text-[10px] py-1 ml-auto">{time}</p>
    </div>
  );
};

export default MessageCard;
