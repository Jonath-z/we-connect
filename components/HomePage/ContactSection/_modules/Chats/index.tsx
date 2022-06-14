import React from "react";
import ContactCard from "components/modules/_modules/Cards/ContactCard";
import { user } from "components/assets/dummy_data/user";

interface IProps {
  isSeeAll: boolean;
  onShowChat: () => void;
}

const Chats = ({ isSeeAll, onShowChat }: IProps) => {
  const { contacts } = user;
  return (
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
              showMessageCheck={true}
            />
            <ContactCard
              contact={contact}
              lastMessage={contact.lastMessage}
              showMessageCheck={true}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Chats;
