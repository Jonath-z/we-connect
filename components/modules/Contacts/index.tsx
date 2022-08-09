import React from "react";
import { user } from "components/assets/dummy_data/user";
import ContactCard from "components/modules/_modules/Cards/ContactCard";
import { TUser } from "lib/types";
import { useSetRecoilState } from "recoil";
import { openedChatAtom } from "lib/atoms";

interface IProps {
  contacts: TUser[];
}

const Contacts = ({ contacts }: IProps) => {
  const setOpenedChat = useSetRecoilState(openedChatAtom);

  return (
    <div className="w-full h-full relative flex flex-col">
      <div className="fixed w-2/5 h-full mobile:w-full overflow-y-auto pl-2 py-20  mobilemd:pt-5 mobilemd:pb-[15rem] mobilemd:mt-32 transition-all bg-light mobilemd:rounded-t-3xl ">
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
                <ContactCard contact={contact} showMessageCheck={false} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Contacts;
