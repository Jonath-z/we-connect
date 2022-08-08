import CallRoom from "components/modules/CallRoom";
import ShowWidget from "components/modules/_modules/ShowWidget";
import { openCallRoomAtom, showChatAtom, userAccountAtom } from "lib/atoms";
import { useCallContext } from "lib/contexts/CallContext";
import { gunServices } from "lib/services/gunService";
import { TUser } from "lib/types";
import React, { FC, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import ChatSection from "./ChatSection";
import ContactSection from "./ContactSection";

interface IProps {
  user: TUser;
}

const HomePage: FC<IProps> = ({ user }) => {
  const [isChatShowed, setIsChatShowed] = useRecoilState(showChatAtom);
  const callRoom = useRecoilValue(openCallRoomAtom);
  const [userAccount, setUserAccount] = useRecoilState(userAccountAtom);

  const { inComingCallInfo } = useCallContext();

  useEffect(() => {
    setUserAccount(user);

    console.log("user from slug", user);
  }, [setUserAccount, user]);

  return (
    <>
      <div
        className={`h-screen flex bg-gradient-to-tr from-blue-400 via-sky-500 to-blue-600 md:bg-light overflow-x-hidden`}
      >
        <div
          className={`w-2/5 h-full overflow-y-auto mobilemd:w-full ${
            isChatShowed && "-translate-x-full w-full mobile:transition-all"
          }`}
        >
          <ContactSection />
        </div>
        <div
          className={`${
            isChatShowed &&
            "transition-all mobile:fixed mobile:h-full w-3/5 mx-5 mobile:mx-0 overflow-y-auto mobile:w-full"
          }`}
        >
          {isChatShowed ? (
            <ChatSection onRedirectToChat={() => setIsChatShowed(false)} />
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
          from={inComingCallInfo.from}
          to={inComingCallInfo.to}
        />
      )}
    </>
  );
};

export default HomePage;
