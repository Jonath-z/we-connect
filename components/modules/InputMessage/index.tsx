import useInputAutoResize from "lib/hooks/useInputAutoResize";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import { VCamera, VLink, VSendPannel } from "../_modules/vectors";
import Gun from "gun";
import { useRecoilState } from "recoil";
import { messagesAtom } from "lib/atoms";

const gun = Gun({ peers: ["https://gun-manhattan.herokuapp.com/gun"] });

const InputMessage = () => {
  const [messageValue, setMessageValue] = useState("");
  const [messages, setMessages] = useRecoilState(messagesAtom);

  const { inputRef, setInputValue } = useInputAutoResize();

  useEffect(() => {
    const message = gun.get("messages");
    message.map().on((m) => {
      setMessages((prev) => [m, ...prev]);
    });
  }, []);

  const saveMessage = () => {
    const message = gun.get("messages");
    message.set({
      senderUsername: "zizou",
      senderId: "Doe---id",
      receiverUsername: "John Doe",
      receiverId: "zizou_id",
      message: messageValue,
      date: Date.now().toLocaleString(),
      time: Date.now().toLocaleString(),
    });
  };

  const onMessageChange: ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }) => {
    const { value } = target;
    setMessageValue(value);
    setInputValue(value);
  };

  const onSendMessage = () => {
    saveMessage();
  };

  return (
    <div className="flex fixed bottom-0 w-full bg-light justify-between items-center py-3 px-2">
      <div className="text-xl -rotate-45">
        <VLink />
      </div>
      <textarea
        ref={inputRef}
        onChange={onMessageChange}
        placeholder="message"
        value={messageValue}
        className="text-xs py-2 px-3 w-full mx-2 bg-transparent outline-none resize-none max-h-20"
      />
      <div className="flex justify-center items-center">
        {messageValue ? (
          <button className="text-2xl" onClick={onSendMessage}>
            <VSendPannel />
          </button>
        ) : (
          <button className="text-xl rounded-full">
            <VCamera />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputMessage;
