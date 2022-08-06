import React from "react";
import { VArrowLeft, WeConnectVector } from "../_modules/vectors";
import { useState } from "react";
import { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import auth from "lib/services/auth";

interface IProps {
  onClickBack: () => void;
  showLogin: boolean;
}

const Login = ({ onClickBack, showLogin }: IProps) => {
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
    <div
      className={`w-full h-full absolute top-0 left-0 bottom-0 right-0 flex mobile:flex-col justify-center items-center ${
        showLogin
          ? "translate-x-100 transition-all"
          : "-translate-x-[2000px] transition-all"
      }`}
    >
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
      <div className="flex flex-col justify-center items-center px-10 mobilemd:px-5 mobilesm:p-0 mobilesm:w-full w-full h-full mobile:h-fit mobile:w-fit">
        <div className="bg-primary flex flex-col justify-center items-center mobilesm:items-stretch bg-opacity-30 backdrop-blur-md p-20 mobilemd:p-5 mobilesm:w-full mobile:my-10 rounded-lg shadow-md border border-light border-opacity-30 transition-all">
          <div>
            <h2 className="text-light text-5xl py-5">Join with</h2>
            <GoogleLogin
              clientId="688414082981-656lplq2khvpkpucff94dv5080u79h9f.apps.googleusercontent.com"
              buttonText="Google"
              onSuccess={auth.onGoogleLoginSuccess}
              onFailure={auth.onGoogleLoginFailure}
              cookiePolicy={"single_host_origin"}
              // isSignedIn={true}
              className="text-light font-bold w-96 mobilesm:w-full py-3 my-2 rounded-xl flex justify-center items-center"
            />
          </div>
        </div>
      </div>
      <div className="landing-vector-bg absolute bottom-0 h-32 w-full" />
    </div>
  );
};

export default Login;
