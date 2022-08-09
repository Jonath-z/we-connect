/* eslint-disable @next/next/no-img-element */
import base64ToObjectUrl from "lib/helper/base64ToObjectUrl";
import cryptoServices from "lib/helper/cryptoServices";
import { TMessage, TUser } from "lib/types";
import React from "react";
import ShowWidget from "../../ShowWidget";

interface IProps {
  messages: TMessage;
  contact: TUser;
}

const MessageCard = ({ messages, contact }: IProps) => {
  const { senderId, receiverId, isImage, isVideo, message, time } = messages;

  console.log("user account", contact);

  return (
    <div
      className={`my-2 py-2 px-2 w-fit max-w-xl mobile:max-w-[90%] transition-all break-words flex flex-col ${
        contact?.id === receiverId
          ? "bg-white rounded-t-xl rounded-br-xl"
          : contact?.id === senderId &&
            "from-blue-500 via-sky-600 to-blue-700 bg-gradient-to-tr text-light ml-auto  rounded-t-xl rounded-bl-xl"
      }`}
    >
      <ShowWidget condition={!isVideo && !isImage}>
        <p
          className={`text-sm ${
            contact?.id === senderId
              ? "mr-auto"
              : contact?.id === receiverId && "ml-auto"
          }`}
        >
          {cryptoServices.decrypt(message)}
        </p>
      </ShowWidget>

      <ShowWidget condition={isVideo}>
        <video autoPlay={false} controls={true} className="rounded-lg">
          <source
            src={
              messages.isVideo
                ? base64ToObjectUrl(cryptoServices.decrypt(message)!)
                : ""
            }
            type="video/webm"
          />
        </video>
      </ShowWidget>
      <ShowWidget condition={isImage}>
        <img
          src={
            messages.isImage
              ? base64ToObjectUrl(cryptoServices.decrypt(message)!)
              : ""
          }
          alt="file-message"
          className="w-80 h-80 object-cover rounded-lg"
        />
      </ShowWidget>
      <p className="text-[10px] py-[2px] ml-auto">{time}</p>
    </div>
  );
};

export default MessageCard;
