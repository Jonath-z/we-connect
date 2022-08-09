import { userAccountAtom } from "lib/atoms";
import { useMessage } from "lib/contexts/MessageContext";
import { TUser } from "lib/types";
import React, { useMemo } from "react";
import { useRecoilValue } from "recoil";

interface IProps {
  contact: TUser;
  children: any;
}

const TypingSignal = ({ contact, children }: IProps) => {
  const { typingSignal } = useMessage();

  const userAccount = useRecoilValue(userAccountAtom);

  const isTyping = useMemo(() => {
    if (
      typingSignal.from.trim().toLocaleLowerCase() ===
        contact.username.trim().toLocaleLowerCase() &&
      typingSignal.to.trim().toLocaleLowerCase() ===
        userAccount?.username.trim().toLocaleLowerCase() &&
      typingSignal.isTyping
    ) {
      return true;
    } else {
      return false;
    }
  }, [
    contact.username,
    typingSignal.from,
    typingSignal.isTyping,
    typingSignal.to,
    userAccount?.username,
  ]);

  return (
    <>
      {isTyping ? (
        <p className="text-xs text-blue-700 font-bold">typing...</p>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default TypingSignal;
