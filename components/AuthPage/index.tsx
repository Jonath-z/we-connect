import React, { useState } from "react";
import GetStarted from "../modules/GetStarted";
import Login from "../modules/Login";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  const onToggleLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="h-screen bg-dark w-full flex flex-col">
      {!isLogin && <GetStarted onClick={onToggleLogin} />}
      {isLogin && <Login onClickBack={onToggleLogin} />}
    </div>
  );
};

export default AuthPage;
