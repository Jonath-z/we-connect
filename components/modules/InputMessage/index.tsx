import useInputAutoResize from "lib/hooks/useInputAutoResize";
import React, { ChangeEventHandler, useState } from "react";
import { VCamera, VLink, VSendPannel } from "../_modules/vectors";

const InputMessage = () => {
  const [messageValue, setMessageValue] = useState("");

  const { inputRef, setInputValue } = useInputAutoResize();

  const onMessageChange: ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }) => {
    const { value } = target;
    setMessageValue(value);
    setInputValue(value);
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
          <button className="text-2xl">
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
