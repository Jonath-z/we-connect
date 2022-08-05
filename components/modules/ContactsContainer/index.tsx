import React, { useEffect, useState } from "react";
import ContactCard from "components/modules/_modules/Cards/ContactCard";
import { user } from "components/assets/dummy_data/user";
import useGunMessages from "lib/hooks/useGunMessages";
import { TMessage } from "../../../lib/types";

interface IProps {
  isSeeAll: boolean;
  onOpenChat: () => void;
}

const ContactsContainer = ({ isSeeAll, onOpenChat }: IProps) => {
  const { contacts } = user;

  const messages = useGunMessages();

  return (
    <div
      className={`fixed w-2/5 h-full mobile:w-full overflow-y-auto pl-2 py-20 mobilemd:pt-5 mobilemd:pb-[20rem] mobilemd:mt-56 bg-light mobilemd:rounded-t-3xl ${
        isSeeAll
          ? "translate-y-full transition-all"
          : "translate-y-0 transition-all"
      }`}
    >
      {messages &&
        contacts.map((contact, index) => {
          return (
            <div key={index} className="py-1" onClick={onOpenChat}>
              <ContactCard
                contact={contact}
                lastMessage={
                  messages.filter(
                    (message: TMessage) => message.senderUsername === "John Doe"
                  )[messages.length - 1]
                }
                showMessageCheck={true}
              />
            </div>
          );
        })}
    </div>
  );
};

export default ContactsContainer;
