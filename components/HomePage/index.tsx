import CallRoom from "components/modules/CallRoom";
import {
  messageAtom,
  openCallRoomAtom,
  openedChatAtom,
  userAccountAtom,
} from "lib/atoms";
import { useCallContext } from "lib/contexts/CallContext";
import apiServices from "lib/services/apiServices";
import { TUser } from "lib/types";
import React, { FC, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ChatSection from "./ChatSection";
import ContactSection from "./ContactSection";

interface IProps {
  user: TUser;
}

const HomePage: FC<IProps> = ({ user }) => {
  const [openedChat, setOpenedChat] = useRecoilState(openedChatAtom);
  const callRoom = useRecoilValue(openCallRoomAtom);
  const [userAccount, setUserAccount] = useRecoilState(userAccountAtom);
  const setMessages = useSetRecoilState(messageAtom);

  useEffect(() => {
    setUserAccount(user);
  }, [setUserAccount, user]);

  useEffect(() => {
    (async () => {
      const { response } = await apiServices.findAllMessages();
      setMessages(response);
    })();
  }, [setMessages]);

  const { callInfo } = useCallContext();

  return (
    <>
      <div
        className={`h-screen flex bg-gradient-to-tr from-blue-400 via-sky-500 to-blue-600 md:bg-light overflow-x-hidden`}
      >
        <div
          className={`w-2/5 h-full overflow-y-auto mobilemd:w-full ${
            openedChat.isOpened &&
            "-translate-x-full w-full mobile:transition-all"
          }`}
        >
          <ContactSection />
        </div>
        <div
          className={`${
            openedChat.isOpened &&
            "transition-all mobile:fixed mobile:h-full w-3/5 mx-5 mobile:mx-0 overflow-y-auto mobile:w-full"
          }`}
        >
          {openedChat.isOpened ? (
            <ChatSection
              onRedirectToChat={() =>
                setOpenedChat({ ...openedChat, isOpened: false })
              }
            />
          ) : (
            <div className="flex justify-center items-center h-full mobile:hidden">
              <p className="bg-white p-2 rounded-2xl shadow-xl font-bold hover:cursor-not-allowed">
                Click To Contact to start messaging
              </p>
            </div>
          )}
        </div>
      </div>
      {callRoom.isOpened && (
        <CallRoom
          roomType={callRoom.roomType}
          from={callInfo.from}
          to={callInfo.to}
        />
      )}
    </>
  );
};

export default HomePage;
