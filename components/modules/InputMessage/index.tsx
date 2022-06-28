import useInputAutoResize from "lib/hooks/useInputAutoResize";
import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import {
  VAttachement,
  VCamera,
  VLink,
  VSend,
  VSendPannel,
} from "../_modules/vectors";
import { useRecoilState } from "recoil";
import { messagesAtom } from "lib/atoms";
import { gunServices } from "lib/services/gunService";
import VideoRecoder from "../VideoRecoder";

const InputMessage = () => {
  const [messageValue, setMessageValue] = useState("");
  const [messages, setMessages] = useRecoilState(messagesAtom);
  const [isOpenVidepRecorder, setIsOpenVideoRecorder] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const { inputRef, setInputValue } = useInputAutoResize();

  useEffect(() => {
    console.log("this messages", messages);
  }, [messages]);

  const onSendMessage = () => {
    const message = {
      senderUsername: "John Doe",
      senderId: "Doe---id",
      receiverUsername: "John Doe",
      receiverId: "zizou_id",
      isVideo: false,
      message: messageValue,
      date: Date.now().toLocaleString(),
      time: Date.now().toLocaleString(),
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
  };

  return (
    <>
      <div className="flex fixed bottom-0 w-full bg-gray-50 justify-between items-center py-3 px-2">
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
        <div className="flex justify-center items-center">
          {messageValue ? (
            <button className="text-2xl" onClick={onSendMessage}>
              <VSend />
            </button>
          ) : (
            <button
              onClick={() => setIsOpenVideoRecorder(!isOpenVidepRecorder)}
              className="text-xl rounded-full"
            >
              <VCamera />
            </button>
          )}
        </div>
      </div>
      {isOpenVidepRecorder && (
        <VideoRecoder
          isOpenVidepRecorder={isOpenVidepRecorder}
          setIsOpenVideoRecoder={setIsOpenVideoRecorder}
        />
      )}
    </>
  );
};

export default InputMessage;
