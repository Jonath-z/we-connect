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
    <div className="fixed w-full m-auto bottom-5 justify-center items-center hidden mobile:flex ">
      <ul className="flex justify-around border border-light border-opacity-40 bg-dark text-light items-center py-2 px-3 w-3/4 rounded-3xl shadow-lg">
        <li
          onClick={() => onSelectOption("chat")}
          className={`flex transition-all ${
            selectedOption.chat
              ? "bg-light text-dark px-3 py-1 rounded-xl"
              : "flex-col"
          } justify-center items-center`}
        >
          <span>
            <VChat />
          </span>
          <span className="text-xs py-1 px-1">Chat</span>
        </li>
        <li
          onClick={() => onSelectOption("contact")}
          className={`flex transition-all justify-center items-center  ${
            selectedOption.contact
              ? "bg-light text-dark px-3 py-1 rounded-xl"
              : "flex-col"
          }`}
        >
          <VContactBook />
          <span className="text-xs py-1 px-1">Contacts</span>
        </li>
        <li
          onClick={() => onSelectOption("calls")}
          className={`flex justify-center items-center transition-all ${
            selectedOption.calls
              ? "bg-light text-dark px-3 py-1 rounded-xl"
              : "flex-col"
          }`}
        >
          <VPhone />
          <span className="text-xs py-1 px-1">Calls</span>
        </li>
      </ul>
    </div>
  );
};

export default BottomNav;
