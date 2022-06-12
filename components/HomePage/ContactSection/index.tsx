import Header from "components/modules/Header";
import React from "react";
import { user } from "components/assets/dummy_data/user";
import ContactCard from "components/modules/_modules/Cards/ContactCard";
import { useRecoilState } from "recoil";
import { showChatAtom } from "lib/atoms";
import BottomNav from "components/modules/BottomNav";
import Stories from "./_modules/Strories";

const ContactSection = () => {
  const { contacts } = user;
  const [isChatShowed, setIsChatShowed] = useRecoilState(showChatAtom);

  const onShowChat = () => {
    setIsChatShowed(true);
  };

  return (
    <div className="w-full h-full relative">
      <div className="bg-light z-10 py-5 px-2 fixed w-2/5 mobile:w-full mobilemd:bg-dark text-light">
        <Header />
        <div className="flex justify-between pt-2 items-center md:hidden">
          <h2 className="text-3xl">Story</h2>
          <button>View all</button>
        </div>
        <div className="mt-5 h-fit md:hidden">
          <Stories />
        </div>
      </div>
      <div className="absolute w-full overflow-y-auto pl-2 py-20 mobilemd:py-5 mobilemd:mt-56 bg-light mobilemd:rounded-t-3xl">
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
      <BottomNav />
    </div>
  );
};

export default ContactSection;
