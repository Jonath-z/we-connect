import Header from "components/modules/Header";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { bottomNavAtom, openedChatAtom, userAccountAtom } from "lib/atoms";
import BottomNav from "components/modules/BottomNav";
import Stories from "../../modules/Strories";
import ContactsContainer from "../../modules/ContactsContainer";
import Contacts from "../../modules/Contacts";
import Calls from "components/modules/Calls";
import Storyview from "components/modules/StoryView";
import apiServices from "lib/services/apiServices";
import { TUser } from "lib/types";

const ContactSection = () => {
  const [isSeeAll, setIsSeeAll] = useState(false);
  const [isStoryView, setIsStoryView] = useState(false);
  const [contacts, setContacts] = useState([]);

  const bottomNavSelectedOption = useRecoilValue(bottomNavAtom);
  const userAccount = useRecoilValue(userAccountAtom);

  useEffect(() => {
    (async () => {
      const { response, error } = await apiServices.findAllUser();

      console.log("all users", response);

      setContacts(
        response.filter((user: TUser) => user.id !== userAccount?.id)
      );
    })();
  }, [userAccount?.id]);

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
      <div className="py-5 px-2 fixed w-2/5 mobile:w-full text-light">
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
          <Stories isSeeAll={isSeeAll} setIsSeeAll={setIsSeeAll} />
        </div>
      </div>
      {bottomNavSelectedOption.chat && (
        <ContactsContainer isSeeAll={isSeeAll} contacts={contacts} />
      )}
      {bottomNavSelectedOption.contact && <Contacts contacts={contacts} />}

      {bottomNavSelectedOption.calls && <Calls onOpenChat={() => null} />}
      <div className={`${isSeeAll && "hidden"}`}>
        <BottomNav />
      </div>
    </div>
  );
};

export default ContactSection;
