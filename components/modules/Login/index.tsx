import React from "react";
import {
  VArrowLeft,
  VEmail,
  Vfacebook,
  WeConnectVector,
} from "../_modules/vectors";
import loginBg from "../../assets/loginBg.jpg";
import { useState } from "react";
import { useEffect } from "react";

interface IProps {
  onClickBack: () => void;
}

const Login = ({ onClickBack }: IProps) => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const width = window.innerWidth;
    width > 1024 ? setIsMobile(false) : setIsMobile(false);
    window.addEventListener("resize", (e) => {
      const newWidth = window.innerWidth;
      newWidth > 1024 ? setIsMobile(false) : setIsMobile(true);
    });
  }, []);

  return (
    <div className="w-full h-full flex mobile:flex-col justify-center items-center">
      <div
        tabIndex={0}
        role="button"
        onKeyDown={() => null}
        onClick={onClickBack}
        className="text-light absolute top-10 left-10 border border-light p-2 rounded-full cursor-pointer hover:text-dark hover:bg-light hover:border-dark hover:shadow-xl transition-all"
      >
        <VArrowLeft />
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center mobilesm:hidden">
        <WeConnectVector className="w-96 h-44 object-cover" />
        <h1 className="text-light text-4xl">We connect</h1>
      </div>
      <div
        style={{
          backgroundImage: `url(${!isMobile && loginBg.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="flex flex-col justify-center items-center px-10 mobilemd:px-5 mobilesm:p-0 mobilesm:w-full w-full h-full mobile:h-fit mobile:w-fit mobile:bg-dark"
      >
        <div className="bg-primary flex flex-col justify-center items-center mobilesm:items-stretch bg-opacity-30 backdrop-blur-md p-20 mobilemd:p-5 mobilesm:w-full mobile:my-10 mobilemd:bg-dark rounded-lg shadow-lg border border-light border-opacity-30 transition-all">
          <div>
            <h2 className="text-light text-5xl py-5">Join with</h2>
            <button className="text-light bg-blue-600 w-96 mobilesm:w-full py-3 my-2 rounded-md flex justify-center items-center">
              <Vfacebook className="mx-5" />
              Facebook
            </button>
            <button className="text-light bg-red-600 w-96 mobilesm:w-full py-3 my-2 rounded-md flex justify-center items-center">
              <VEmail className="mx-5" />
              Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
