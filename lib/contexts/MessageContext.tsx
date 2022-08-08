import { TMessage } from "lib/types";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { socket } from "./CallContext";

interface IMessageContext {
  sendMessage: (message: TMessage) => void;
}

const defaultContext: IMessageContext = {
  sendMessage: () => null,
};

const MessageContext = createContext(defaultContext);

export const useMessage = () => useContext(MessageContext);

const MessageProvider = ({ children }: any) => {
  useEffect(() => {
    socket.on("newMessage", (data) => {
      console.log("message", data);
    });
  }, []);

  const sendMessage = useCallback((message: TMessage) => {
    socket.emit("sendMessage", message);
  }, []);

  return (
    <MessageContext.Provider value={{ sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
