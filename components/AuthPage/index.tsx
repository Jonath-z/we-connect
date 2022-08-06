import React, { useState } from "react";
import GetStarted from "../modules/GetStarted";
import Login from "../modules/Login";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  const onToggleLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="h-screen from-blue-500 via-sky-600 to-blue-700 bg-gradient-to-tr w-full flex">
      <GetStarted showGetStarted={!isLogin} onClick={onToggleLogin} />
      <Login showLogin={isLogin} onClickBack={onToggleLogin} />
    </div>
  );
};

export default AuthPage;
