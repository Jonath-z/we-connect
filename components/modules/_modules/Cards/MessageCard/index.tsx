/* eslint-disable @next/next/no-img-element */
import { userAccountAtom } from "lib/atoms";
import base64ToObjectUrl from "lib/helper/base64ToObjectUrl";
import { TMessage } from "lib/types";
import React from "react";
import { useRecoilValue } from "recoil";

interface IProps {
  messages: TMessage;
}

const MessageCard = ({ messages }: IProps) => {
  const { message, time, senderId, isVideo, isImage } = messages;

  const userAccount = useRecoilValue(userAccountAtom);

  return (
    <div
      className={`my-2 py-2 px-2 w-fit max-w-xl mobile:max-w-[90%] transition-all break-words flex flex-col ${
        userAccount?.id === senderId
          ? "bg-white rounded-t-xl rounded-br-xl"
          : "from-blue-500 via-sky-600 to-blue-700 bg-gradient-to-tr text-light ml-auto  rounded-t-xl rounded-bl-xl"
      }`}
    >
      {!isVideo && !isImage && (
        <p
          className={`text-sm ${
            userAccount?.id === senderId ? "mr-auto" : "ml-auto"
          }`}
        >
          {message}
        </p>
      )}
      {isVideo && (
        <video autoPlay={false} controls={true} className="rounded-lg">
          <source src={base64ToObjectUrl(message)} type="video/webm" />
        </video>
      )}
      {isImage && (
        <img
          src={base64ToObjectUrl(message)}
          alt="file-message"
          className="w-80 h-80 object-cover rounded-lg"
        />
      )}
      <p className="text-[10px] py-[2px] ml-auto">{time}</p>
    </div>
  );
};

export default MessageCard;
