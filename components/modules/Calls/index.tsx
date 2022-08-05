/* eslint-disable @next/next/no-img-element */
import React from "react";
import ContactCard from "../_modules/Cards/ContactCard";
import { user } from "components/assets/dummy_data/user";
import { VDot, VPhone } from "../_modules/vectors";

interface IProps {
  onOpenChat: () => void;
}

const Calls = ({ onOpenChat }: IProps) => {
  const { calls } = user;
  return (
    <div className="w-full h-full relative flex flex-col">
      <div className="fixed w-2/5 h-full mobile:w-full overflow-y-auto pl-2 py-20 mobilemd:pt-5 mobilemd:pb-[15rem] mobilemd:mt-32 transition-all bg-light mobilemd:rounded-t-3xl ">
        {calls.map((call, index) => {
          return (
            <div
              key={index}
              className="flex items-center hover:bg-white py-1 px-1 rounded-md cursor-pointer transition-all"
            >
              <img
                src={call.userAvatarUrl}
                alt={call.username}
                className="w-14 h-14 object-cover rounded-full"
              />
              <div className="flex justify-between w-full px-2">
                <div>
                  <p className="font-bold text-dark text-sm">{call.username}</p>
                  <p className="flex items-center text-xs text-gray-700">
                    {call.Date}
                    <span>
                      <VDot />
                    </span>
                    {call.time}
                  </p>
                </div>
                <button
                  className={`${
                    call.missed ? "text-red-500" : "text-green-700"
                  }`}
                >
                  <VPhone />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calls;
