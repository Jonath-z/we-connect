import { gunServices } from "lib/services/gunService";
import { TMessage } from "lib/types";
import React, { useEffect, useState } from "react";

const useGunMessages = () => {
  const [messages, setMessages] = useState<TMessage[]>([]);

  useEffect(() => {
    gunServices.messageListener?.map((message) => {
      setMessages((prevMessages: any) => [...prevMessages, message]);
    });
  }, []);

  return messages;
};

export default useGunMessages;
