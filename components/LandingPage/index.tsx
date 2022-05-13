import React from "react";
import { WeConnectVector } from "../modules/_modules/vectors";

const LandingPage = () => {
  return (
    <div className="landing-vector-bg h-screen bg-[#252422] w-full flex flex-col justify-between items-center px-5 pt-36 pb-10">
      <div className="text-center">
        <WeConnectVector className="w-56 h-28 object-cover" />
        <h1 className="text-3xl text-[#E9E0E0] font-ibmPlexSans">We Connect</h1>
      </div>
      <button className="bg-[#14FFEC] w-full py-3 rounded-full font-ibmPlexSans text-2xl">
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;
