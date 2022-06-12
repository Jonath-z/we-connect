import React from "react";
import { VChat, VContact, VContactBook, VPhone } from "../_modules/vectors";

const BottomNav = () => {
  return (
    <div className="fixed w-full m-auto bottom-5 justify-center items-center hidden mobile:flex">
      <ul className="flex justify-around items-center bg-dark text-light py-2 px-3 w-3/4 rounded-3xl shadow-lg">
        <li className="flex flex-col  justify-center items-center">
          <VChat />
          <span className="text-xs py-1">Chat</span>
        </li>
        <li className="flex flex-col  justify-center items-center">
          <VContactBook />
          <span className="text-xs py-1">Contacts</span>
        </li>
        <li className="flex flex-col  justify-center items-center">
          <VPhone />
          <span className="text-xs py-1">Calls</span>
        </li>
        <li className="flex flex-col  justify-center items-center">
          <VContact />
          <span className="text-xs py-1">Profile</span>
        </li>
      </ul>
    </div>
  );
};

export default BottomNav;
