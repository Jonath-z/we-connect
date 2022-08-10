/* eslint-disable @next/next/no-img-element */
import base64ToObjectUrl from "lib/helper/base64ToObjectUrl";
import cryptoServices from "lib/helper/cryptoServices";
import useClickOutside from "lib/hooks/useClickOutside";
import { TMessage, TUser } from "lib/types";
import React, { useState } from "react";
import ShowWidget from "../../ShowWidget";

interface IProps {
  messages: TMessage;
  contact: TUser;
  userAccount: TUser;
}

const MessageCard = ({ messages, contact, userAccount }: IProps) => {
  const { senderId, receiverId, isImage, isVideo, message, time } = messages;

  const [imageFullView, setImageFullView] = useState({
    display: false,
    imageUrl: "",
  });

  const onToggleImageFullView = (imageUrl: string) => {
    setImageFullView({
      display: true,
      imageUrl,
    });
  };

  const ref = useClickOutside(() =>
    setImageFullView({ ...imageFullView, display: false })
  );

  return (
    <div className="my-2">
      <div
        className={`py-2 px-2 w-fit max-w-xl mobile:max-w-[90%] transition-all break-words flex items-baseline ${
          userAccount.id === senderId && contact.id === receiverId
            ? "from-blue-500 via-sky-600 to-blue-700 bg-gradient-to-tr text-light ml-auto  rounded-t-xl rounded-bl-xl"
            : "bg-gray-100 rounded-t-xl rounded-br-xl mr-auto h-fit"
        }`}
      >
        <ShowWidget condition={!isVideo && !isImage}>
          <p className="text-[12px]">{cryptoServices.decrypt(message)}</p>
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
            onClick={() =>
              onToggleImageFullView(
                base64ToObjectUrl(cryptoServices.decrypt(message)!) || ""
              )
            }
          />
          <div
            className={`${
              imageFullView.display
                ? "scale-100 transition-all fixed top-0 bottom-0 left-0 right-0 h-screen w-full bg-black/30 z-20 flex justify-center items-center px-2 backdrop-blur-lg"
                : "scale-0 hidden transition-all"
            }`}
          >
            <div ref={ref}>
              <img
                src={
                  messages.isImage
                    ? base64ToObjectUrl(cryptoServices.decrypt(message)!)
                    : ""
                }
                alt="file-message"
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
          </div>
        </ShowWidget>
      </div>
      <p
        className={`${
          userAccount.id !== senderId ? "text-left" : "text-right"
        } text-[8px] text-gray-500 mt-[1px] mx-[1px]`}
      >
        {time}
      </p>
    </div>
  );
};

export default MessageCard;
