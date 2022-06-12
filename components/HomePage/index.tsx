import { showChatAtom } from "lib/atoms";
import React from "react";
import { useRecoilValue } from "recoil";
import ChatSection from "./ChatSection";
import ContactSection from "./ContactSection";

const HomePage = () => {
  const isChatShowed = useRecoilValue(showChatAtom);
  return (
    <div className="h-screen flex bg-dark md:bg-light overflow-x-hidden">
      <div className="w-2/5 h-full overflow-y-auto mobilemd:w-full">
        <ContactSection />
      </div>
      <div className="w-3/5 mx-5 overflow-y-auto mobilemd:hidden transition-all">
        {isChatShowed ? (
          <ChatSection />
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="bg-white p-2 rounded-2xl shadow-xl font-bold hover:cursor-not-allowed">
              Click To Contact to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
