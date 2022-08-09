import React from "react";
import ContactCard from "components/modules/_modules/Cards/ContactCard";
import { TMessage, TUser } from "../../../lib/types";
import { openedChatAtom } from "lib/atoms";
import { useSetRecoilState } from "recoil";

interface IProps {
  isSeeAll: boolean;
  contacts: TUser[];
}

const ContactsContainer = ({ isSeeAll, contacts }: IProps) => {
  const setOpenedChat = useSetRecoilState(openedChatAtom);

  return (
    <div
      className={`fixed w-2/5 h-full mobile:w-full overflow-y-auto pl-2 py-20 mobilemd:pt-5 mobilemd:pb-[20rem] mobilemd:mt-56 bg-light mobilemd:rounded-t-3xl ${
        isSeeAll
          ? "translate-y-full transition-all"
          : "translate-y-0 transition-all"
      }`}
    >
      {contacts &&
        contacts.map((contact, index) => {
          return (
            <div
              key={index}
              className="py-1"
              onClick={() => {
                setOpenedChat({ contact, isOpened: true });
              }}
            >
              <ContactCard
                contact={contact}
                // lastMessage={"last message"}
                showMessageCheck={true}
              />
            </div>
          );
        })}
    </div>
  );
};

export default ContactsContainer;
