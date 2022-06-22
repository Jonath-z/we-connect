import { gunServices } from "lib/services/gunService";
import React, { useEffect, useRef, useState } from "react";
import MessageCard from "components/modules/_modules/Cards/MessageCard";

const useGunMessages = () => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    gunServices.messageListener?.map((message) => {
      setMessages((prevMessages: any) => [...prevMessages, message]);
    });
  }, []);

  return messages;
};

export default useGunMessages;
