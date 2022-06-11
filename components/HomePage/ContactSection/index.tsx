import Header from "components/modules/Header";
import React from "react";
import { user } from "components/assets/dummy_data/user";
import ContactCard from "components/modules/_modules/Cards/ContactCard";

const ContactSection = () => {
  const { contacts } = user;
  return (
    <div className="w-2/5 h-full relative">
      <div className="fixed top-0 w-2/5 bg-light z-10 py-5 px-5">
        <Header />
      </div>
      <div className="absolute  w-full overflow-y-auto px-5 mt-20">
        {contacts.map((contact, index) => {
          return (
            <div key={index} className="py-1">
              <ContactCard
                contact={contact}
                lastMessage={contact.lastMessage}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactSection;
