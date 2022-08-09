import { messageAtom } from "lib/atoms";
import { TMessage } from "lib/types";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRecoilState } from "recoil";
import { socket } from "./CallContext";

interface ITypingMessageSignal {
  from: string;
  to: string;
  isTyping: boolean;
}

interface IMessageContext {
  sendMessage: (message: TMessage) => void;
  sendTypingMessageSignal: (signal: ITypingMessageSignal) => void;
  typingSignal: ITypingMessageSignal;
}

const defaultContext: IMessageContext = {
  sendMessage: () => null,
  sendTypingMessageSignal: () => null,
  typingSignal: {
    from: "",
    to: "",
    isTyping: false,
  },
};

const MessageContext = createContext(defaultContext);

export const useMessage = () => useContext(MessageContext);

const MessageProvider = ({ children }: any) => {
  const [typingSignal, setTypingSignal] = useState<ITypingMessageSignal>({
    from: "",
    to: "",
    isTyping: false,
  });

  const [messages, setMessages] = useRecoilState(messageAtom);

  useEffect(() => {
    socket.on("newMessage", (data) => {
      console.log("message", data);
      messages && setMessages([...messages, data]);
    });

    socket.on("getTypingMessageSignal", (data) => {
      setTypingSignal({
        from: data.from,
        to: data.to,
        isTyping: data.isTyping,
      });
    });
  }, []);

  const sendMessage = useCallback((message: TMessage) => {
    socket.emit("sendMessage", message);
  }, []);

  const sendTypingMessageSignal = useCallback(
    (signal: ITypingMessageSignal) => {
      socket.emit("typingMessageSignal", signal);
    },
    []
  );

  return (
    <MessageContext.Provider
      value={{ sendMessage, sendTypingMessageSignal, typingSignal }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
