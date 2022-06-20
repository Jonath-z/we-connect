import { gunServices } from "lib/services/gunService";
import React, { useEffect, useState } from "react";

const useGunMessages = () => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    gunServices.messageListener?.map((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  return messages;
};

export default useGunMessages;
