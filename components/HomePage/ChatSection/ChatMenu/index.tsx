import { VColor, VShop, VTrash } from "components/modules/_modules/vectors";
import useClickOutside from "lib/hooks/useClickOutside";
import React from "react";

interface IProps {
  isChatMenuVisible: boolean;
  setIsChatMenuVisible: any;
}

const ChatMenu = ({ isChatMenuVisible, setIsChatMenuVisible }: IProps) => {
  const ref = useClickOutside(() => setIsChatMenuVisible(false));
  return (
    <div
      ref={ref}
      className={`text-light fixed bg-dark top-16 bg-opacity-70 backdrop-blur-md right-0 p-5 mx-3 rounded-md ${
        isChatMenuVisible
          ? "translate-x-0 transition-all"
          : "translate-x-[2000px] transition-all"
      }`}
    >
      <ul className="flex flex-col">
        <li className="flex justify-start py-2 text-sm items-center cursor-pointer">
          <VColor />
          <span className="px-2">Change Color</span>
        </li>
        <li className="flex justify-start py-2 text-sm items-center cursor-pointer">
          <VShop />
          <span className="px-2">Marketplace</span>
        </li>
        <li className="flex justify-start py-2 text-sm items-center cursor-pointer">
          <VTrash />
          <span className="px-2"> Delete chat </span>
        </li>
      </ul>
    </div>
  );
};

export default ChatMenu;
