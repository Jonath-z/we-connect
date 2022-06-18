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
      className={`my-2 py-1 px-2 w-fit max-w-xl mobile:max-w-[90%] transition-all break-words flex flex-col ${
        id === senderId
          ? "bg-white rounded-t-xl rounded-br-xl"
          : "bg-dark text-light ml-auto  rounded-t-xl rounded-bl-xl"
      }`}
    >
      <p className={`text-xs ${id === senderId ? "mr-auto" : "ml-auto"}`}>
        {message}
      </p>
      <p className="text-[10px] py-[2px] ml-auto">{time}</p>
    </div>
  );
};

export default MessageCard;
