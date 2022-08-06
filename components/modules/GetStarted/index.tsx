import React from "react";
import { WeConnectVector } from "../_modules/vectors";

interface IProps {
  onClick: () => void;
  showGetStarted: boolean;
}

const GetStarted = ({ onClick, showGetStarted }: IProps) => {
  return (
    <div
      className={`flex flex-col justify-around items-center px-5 pt-36 pb-10 h-full absolute top-0 left-0 right-0 bottom-0 ${
        showGetStarted ? "translate-x-0" : "-translate-x-[2000px]"
      }`}
    >
      <div className="text-center">
        <WeConnectVector className="w-56 h-28 object-cover" />
        <h1 className="text-3xl text-light font-ibmPlexSans py-2">
          We Connect
        </h1>
      </div>
      <button
        onClick={onClick}
        className="bg-primary py-3 rounded-full font-ibmPlexSans text-2xl w-96"
      >
        Get Started
      </button>
      <div className="landing-vector-bg absolute bottom-0 h-32 w-full" />
    </div>
  );
};

export default GetStarted;
