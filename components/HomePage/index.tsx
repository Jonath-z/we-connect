import CallRoom from "components/modules/CallRoom";
import { openCallRoomAtom, showChatAtom } from "lib/atoms";
import { useCallContext } from "lib/contexts/CallContext";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import ChatSection from "./ChatSection";
import ContactSection from "./ContactSection";

const HomePage = () => {
  const [isChatShowed, setIsChatShowed] = useRecoilState(showChatAtom);

  const { inComingCallInfo } = useCallContext();

  const callRoom = useRecoilValue(openCallRoomAtom);

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
