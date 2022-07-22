import React from "react";
import { NextPage } from "next";
import HomePage from "../../components/HomePage";
import MouveOnScreenProvider from "lib/contexts/MouveOnScreenContext";
import CallProvider from "lib/contexts/CallContext";

const Home: NextPage = () => {
  return (
    <MouveOnScreenProvider>
      <CallProvider>
        <HomePage />
      </CallProvider>
    </MouveOnScreenProvider>
  );
};

export default Home;
