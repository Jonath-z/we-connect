import { user } from "components/assets/dummy_data/user";
import base64ToObjectUrl from "lib/helper/base64ToObjectUrl";
import React from "react";

type Message = {
  senderUsername: string;
  senderId: string;
  receiverUsername: string;
  receiverId: string;
  message: string;
  date: string;
  time: string;
  isVideo: boolean;
};

interface IProps {
  messages: Message;
}

const MessageCard = ({ messages }: IProps) => {
  const { message, time, senderId, isVideo } = messages;
  console.log("message received", messages);
  const { id } = user;
  return (
    <div
      className={`my-2 py-1 px-2 w-fit max-w-xl mobile:max-w-[90%] transition-all break-words flex flex-col ${
        id === senderId
          ? "bg-white rounded-t-xl rounded-br-xl"
          : "bg-dark text-light ml-auto  rounded-t-xl rounded-bl-xl"
      }`}
    >
      {!isVideo ? (
        <p className={`text-xs ${id === senderId ? "mr-auto" : "ml-auto"}`}>
          {message}
        </p>
      ) : (
        <video
          className="h-80 w-80 rounded-lg"
          autoPlay={false}
          controls={true}
        >
          <source
            src={base64ToObjectUrl(message)}
            type="video/webm"
            className="rounded-lg"
          />
        </video>
      )}
      <p className="text-[10px] py-[2px] ml-auto">{time}</p>
    </div>
  );
};

export default MessageCard;
