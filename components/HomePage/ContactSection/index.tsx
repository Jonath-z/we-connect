import Header from "components/modules/Header";
import React, { useState } from "react";
import { user } from "components/assets/dummy_data/user";
import ContactCard from "components/modules/_modules/Cards/ContactCard";
import { useRecoilState } from "recoil";
import { showChatAtom } from "lib/atoms";
import BottomNav from "components/modules/BottomNav";
import Stories from "./_modules/Strories";

const ContactSection = () => {
  const { contacts } = user;
  const [isChatShowed, setIsChatShowed] = useRecoilState(showChatAtom);
  const [isSeeAll, setIsSeeAll] = useState(false);

  const onShowChat = () => {
    setIsChatShowed(true);
  };

  const toggleSeeAll = () => {
    setIsSeeAll(!isSeeAll);
  };

  return (
    <div className="w-full h-full relative flex flex-col">
      <div className="bg-light z-10 py-5 px-2 fixed w-2/5 mobile:w-full mobilemd:bg-dark text-light">
        <Header />
      </div>
      <div className="fixed w-full flex flex-col max-h-full overflow-y-auto my-16">
        <div className="flex justify-between pt-2 items-center md:hidden px-2 text-light">
          <h2 className="text-3xl font-bold">Stories</h2>
          <button className="text-xs" onClick={toggleSeeAll}>
            {isSeeAll ? "See less" : "See All"}
          </button>
        </div>
        <div
          className={`mt-5 pb-20 ${
            isSeeAll ? "h-full overflow-y-auto" : "h-fit"
          } md:hidden`}
        >
          <Stories isSeeAll={isSeeAll} />
        </div>
      </div>
      <div
        className={`fixed w-2/5 h-full mobile:w-full overflow-y-auto pl-2 py-20 mobilemd:py-5 mobilemd:mt-56 bg-light mobilemd:rounded-t-3xl ${
          isSeeAll
            ? "translate-y-full transition-all"
            : "translate-y-0 transition-all"
        }`}
      >
        {contacts.map((contact, index) => {
          return (
            <div key={index} className="py-1" onClick={onShowChat}>
              <ContactCard
                contact={contact}
                lastMessage={contact.lastMessage}
              />
              <ContactCard
                contact={contact}
                lastMessage={contact.lastMessage}
              />
            </div>
          );
        })}
      </div>
      <div className={`${isSeeAll && "hidden"}`}>
        <BottomNav />
      </div>
    </div>
  );
};

export default ContactSection;
