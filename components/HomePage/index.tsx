import CallRoom from "components/modules/CallRoom";
import { showChatAtom } from "lib/atoms";
import MouveOnScreenProvider from "lib/contexts/MouveOnScreenContext";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import ChatSection from "./ChatSection";
import ContactSection from "./ContactSection";

const HomePage = () => {
  const [isChatShowed, setIsChatShowed] = useRecoilState(showChatAtom);
  return (
    <MouveOnScreenProvider>
      <div className={`h-screen flex bg-dark md:bg-light overflow-x-hidden`}>
        <div
          className={`w-2/5 h-full overflow-y-auto mobilemd:w-full ${
            isChatShowed && "-translate-x-full w-full mobile:transition-all"
          }`}
        >
          <ContactSection />
        </div>
        <div
          className={`w-3/5 mx-5 mobile:mx-0 overflow-y-auto mobile:w-full ${
            isChatShowed && "transition-all mobile:fixed mobile:h-full"
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
      <CallRoom roomType="video" />
    </MouveOnScreenProvider>
  );
};

export default HomePage;
