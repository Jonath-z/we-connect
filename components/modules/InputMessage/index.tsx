import useInputAutoResize from "lib/hooks/useInputAutoResize";
import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import {
  VAttachement,
  VCamera,
  VMessagevideoCamera,
  VSend,
} from "../_modules/vectors";
import { useRecoilState } from "recoil";
import { messagesAtom } from "lib/atoms";
import { gunServices } from "lib/services/gunService";
import VideoMessageRecorder from "../VideoMessageRecoder";
import dateServices from "lib/services/dateService";
import { socket } from "lib/contexts/CallContext";

const InputMessage = () => {
  const [messageValue, setMessageValue] = useState("");
  const [messages, setMessages] = useRecoilState(messagesAtom);
  const [isOpenVidepRecorder, setIsOpenVideoRecorder] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const { inputRef, setInputValue } = useInputAutoResize();

  const sendTypingMessageSignal = (isTyping: boolean) => {
    socket.emit("typingMessageSignal", {
      from: "John Doe",
      to: "John Doe",
      isTyping,
    });
  };

  const onSendMessage = () => {
    const message = {
      senderUsername: "John Doe",
      senderId: "Doe---id",
      receiverUsername: "John Doe",
      receiverId: "zizou_id",
      isVideo: false,
      message: messageValue,
      date: dateServices.getFullDate(),
      time: dateServices.getTime(),
    };

    gunServices.sendMessage(message);
    setMessageValue("");
  };

  const onSendFile = () => {
    inputFileRef.current?.click();
  };

  const onFileChange = (e: { target: { files: any } }) => {
    const { files } = e.target;
    if (files && files[0].type.match("image.*")) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        const base64ImageString = reader.result;
        const message = {
          senderUsername: "John Doe",
          senderId: "Doe---id",
          receiverUsername: "John Doe",
          receiverId: "zizou_id",
          isVideo: false,
          isImage: true,
          message: base64ImageString,
          date: Date.now().toLocaleString(),
          time: Date.now().toLocaleString(),
        };
        gunServices.sendMessage(message);
      };
    }
  };

  const onMessageChange: ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }) => {
    const { value } = target;
    setMessageValue(value);
    setInputValue(value);

    sendTypingMessageSignal(true);

    setTimeout(() => {
      sendTypingMessageSignal(false);
    }, 2000);
  };

  return (
    <>
      <div className="flex fixed bottom-0 w-full bg-gray-50 justify-between items-center p-2">
        <button onClick={onSendFile} className="text-xl -rotate-45">
          <VAttachement />
        </button>
        <textarea
          ref={inputRef}
          onChange={onMessageChange}
          placeholder="message"
          value={messageValue}
          className="text-xs py-2 px-3 w-full mx-2 bg-transparent outline-none resize-none max-h-20"
        />
        <input
          ref={inputFileRef}
          type="file"
          className="hidden"
          id="input-file"
          onChange={onFileChange}
        />
        <div className="bg-black text-white h-7 w-7 overflow-hidden flex justify-center items-center p-5 rounded-full">
          <button
            className={`${
              messageValue
                ? "scale-100 text-xl transition-all"
                : "scale-0 text-[0px]"
            }`}
            onClick={onSendMessage}
          >
            <VSend />
          </button>
          <button
            onClick={() => setIsOpenVideoRecorder(!isOpenVidepRecorder)}
            className={`${
              messageValue
                ? "scale-0 text-[0px]"
                : "scale-100 text-xl transition-all "
            }`}
          >
            <VMessagevideoCamera />
          </button>
        </div>
      </div>
      {isOpenVidepRecorder && (
        <VideoMessageRecorder
          isOpenVidepRecorder={isOpenVidepRecorder}
          setIsOpenVideoRecoder={setIsOpenVideoRecorder}
        />
      )}
    </>
  );
};

export default InputMessage;
