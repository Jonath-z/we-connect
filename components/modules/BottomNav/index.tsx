import { bottomNavAtom } from "lib/atoms";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { VChat, VContact, VContactBook, VPhone } from "../_modules/vectors";

const BottomNav = () => {
  const [selectedOption, setSelectedOption] = useRecoilState(bottomNavAtom);

  const onSelectOption = (option: string) => {
    switch (option) {
      case "chat":
        setSelectedOption({
          chat: true,
          contact: false,
          calls: false,
          profile: false,
        });
        break;
      case "contact":
        setSelectedOption({
          chat: false,
          contact: true,
          calls: false,
          profile: false,
        });
        break;
      case "calls":
        setSelectedOption({
          chat: false,
          contact: false,
          calls: true,
          profile: false,
        });
        break;
    }
  };

  return (
    <div className="fixed w-full m-auto bottom-0 justify-center items-center hidden mobile:flex ">
      <ul className="flex justify-around border border-light border-opacity-40 bg-gradient-to-tr from-blue-400 via-sky-500 to-blue-600 backdrop-blur-lg text-light items-center py-3 w-full shadow-lg">
        <li
          onClick={() => onSelectOption("chat")}
          className={`flex ${
            selectedOption.chat
              ? "bg-light text-dark p-3 rounded-full -mt-14 shadow-xl border text-3xl transition-all"
              : "flex-col border-none -mt-0"
          } justify-center items-center`}
        >
          <span>
            <VChat />
          </span>
          {!selectedOption.chat && (
            <span className={`text-xs py-1 px-1 font-bold`}>Chat</span>
          )}
        </li>
        <li
          onClick={() => onSelectOption("contact")}
          className={`flex justify-center items-center  ${
            selectedOption.contact
              ? "bg-light text-dark p-3 rounded-full -mt-14 shadow-xl border text-3xl transition-all"
              : "flex-col"
          }`}
        >
          <VContactBook />
          {!selectedOption.contact && (
            <span className="text-xs py-1 px-1 font-bold">Contacts</span>
          )}
        </li>
        <li
          onClick={() => onSelectOption("calls")}
          className={`flex justify-center items-center ${
            selectedOption.calls
              ? "bg-light text-dark p-3 rounded-full -mt-14 shadow-xl border text-3xl transition-all"
              : "flex-col"
          }`}
        >
          <VPhone />
          {!selectedOption.calls && (
            <span className="text-xs py-1 px-1 font-bold">Calls</span>
          )}
        </li>
      </ul>
    </div>
  );
};

export default BottomNav;
