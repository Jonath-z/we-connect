import { TMessage } from "lib/types";
import React, { createContext, useContext } from "react";

interface IMessageContext {
  sendMessage: (message: TMessage) => TMessage | null;
}

const defaultContext: IMessageContext = {
  sendMessage: () => null,
};

const MessageContext = createContext(defaultContext);

export const useMessage = () => useContext(MessageContext);

const MessageProvider = () => {
  return <div>MessageProvider</div>;
};

export default MessageProvider;
