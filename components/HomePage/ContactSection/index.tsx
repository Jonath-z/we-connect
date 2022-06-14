import Header from "components/modules/Header";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { bottomNavAtom, showChatAtom } from "lib/atoms";
import BottomNav from "components/modules/BottomNav";
import Stories from "../../modules/Strories";
import Chats from "../../modules/Chats";
import Contacts from "../../modules/Contacts";
import Calls from "components/modules/Calls";

const ContactSection = () => {
  const [isChatShowed, setIsChatShowed] = useRecoilState(showChatAtom);
  const [isSeeAll, setIsSeeAll] = useState(false);
  const bottomNavSelectedOption = useRecoilValue(bottomNavAtom);

  const onShowChat = () => {
    setIsChatShowed(true);
  };

  const toggleSeeAll = () => {
    setIsSeeAll(!isSeeAll);
  };

  const contentTitle = () => {
    if (bottomNavSelectedOption.chat) {
      return "Stories";
    } else if (bottomNavSelectedOption.contact) {
      return "Contacts";
    } else if (bottomNavSelectedOption.calls) {
      return "Calls";
    }
  };

  return (
    <div className="w-full h-full relative flex flex-col">
      <div className="bg-light z-10 py-5 px-2 fixed w-2/5 mobile:w-full mobilemd:bg-dark text-light">
        <Header />
      </div>
      <div
        className={`fixed w-full flex flex-col max-h-full overflow-y-auto my-16`}
      >
        <div className="flex justify-between pt-2 items-center md:hidden px-2 text-light">
          <h2 className="text-3xl font-bold">{contentTitle()}</h2>
          <button
            className={`text-xs ${!bottomNavSelectedOption.chat && "hidden"}`}
            onClick={toggleSeeAll}
          >
            {isSeeAll ? "See less" : "See All"}
          </button>
        </div>
        <div
          className={`mt-5 pb-20 ${
            isSeeAll ? "h-full overflow-y-auto" : "h-fit"
          } ${!bottomNavSelectedOption.chat && "hidden"} md:hidden`}
        >
          <Stories isSeeAll={isSeeAll} />
        </div>
      </div>
      {bottomNavSelectedOption.chat && (
        <Chats onShowChat={onShowChat} isSeeAll={isSeeAll} />
      )}
      {bottomNavSelectedOption.contact && <Contacts onShowChat={onShowChat} />}

      {bottomNavSelectedOption.calls && <Calls onShowChat={onShowChat} />}
      <div className={`${isSeeAll && "hidden"}`}>
        <BottomNav />
      </div>
    </div>
  );
};

export default ContactSection;
