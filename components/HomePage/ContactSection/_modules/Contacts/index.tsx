import React from "react";
import { user } from "components/assets/dummy_data/user";
import ContactCard from "components/modules/_modules/Cards/ContactCard";

interface IProps {
  onShowChat: () => void;
}

const Contacts = ({ onShowChat }: IProps) => {
  const { contacts } = user;
  return (
    <div className="w-full h-full relative flex flex-col">
      <div className="fixed w-2/5 h-full mobile:w-full overflow-y-auto pl-2 py-20 mobilemd:py-5 mobilemd:mt-32 transition-all bg-light mobilemd:rounded-t-3xl ">
        {contacts.map((contact, index) => {
          return (
            <div key={index} className="py-1" onClick={onShowChat}>
              <ContactCard contact={contact} showMessageCheck={false} />
              <ContactCard contact={contact} showMessageCheck={false} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Contacts;
