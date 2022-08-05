import Header from "components/modules/Header";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { bottomNavAtom, showChatAtom } from "lib/atoms";
import BottomNav from "components/modules/BottomNav";
import Stories from "../../modules/Strories";
import ContactsContainer from "../../modules/ContactsContainer";
import Contacts from "../../modules/Contacts";
import Calls from "components/modules/Calls";
import Storyview from "components/modules/StoryView";

const ContactSection = () => {
  const [isChatShowed, setIsChatShowed] = useRecoilState(showChatAtom);
  const [isSeeAll, setIsSeeAll] = useState(false);
  const [isStoryView, setIsStoryView] = useState(false);
  const bottomNavSelectedOption = useRecoilValue(bottomNavAtom);

  const onOpenChat = () => {
    setIsChatShowed(true);
  };

  const toggleSeeAll = () => {
    setIsSeeAll(!isSeeAll);
  };

  const toggleStoryView = () => {
    setIsStoryView(!isStoryView);
  };

  const contentTitle = () => {
    if (bottomNavSelectedOption.chat) {
      return "Story";
    } else if (bottomNavSelectedOption.contact) {
      return "Contacts";
    } else if (bottomNavSelectedOption.calls) {
      return "Calls";
    }
  };

  return (
    <div className="w-full h-full relative flex flex-col bg-gradient-to-tr from-blue-400 via-sky-500 to-blue-600">
      <div className="z-10 py-5 px-2 fixed w-2/5 mobile:w-full text-light">
        <Header />
      </div>
      <div className="fixed w-full flex flex-col max-h-full overflow-y-auto my-16">
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
          <Stories isSeeAll={isSeeAll} toggleStoryView={toggleStoryView} />
        </div>
      </div>
      {bottomNavSelectedOption.chat && (
        <ContactsContainer onOpenChat={onOpenChat} isSeeAll={isSeeAll} />
      )}
      {bottomNavSelectedOption.contact && <Contacts onOpenChat={onOpenChat} />}

      {bottomNavSelectedOption.calls && <Calls onOpenChat={onOpenChat} />}
      <div className={`${isSeeAll && "hidden"}`}>
        <BottomNav />
      </div>
      {isStoryView && (
        <Storyview
          story={[
            {
              storyUrl:
                "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2022/03/bored-ape-nft.jpg",
              storyDescription: "This is we connect story",
            },
          ]}
          toggleStoryView={toggleStoryView}
        />
      )}
    </div>
  );
};

export default ContactSection;
