import React, { useEffect, useRef, useState } from "react";

const useInputAutoResize = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "0px";
      const scrollHeight = inputRef.current?.scrollHeight;
      inputRef.current.style.height = scrollHeight + "px";
    }
  }, [inputValue]);

  return {
    setInputValue,
    inputRef,
  };
};

export default useInputAutoResize;
