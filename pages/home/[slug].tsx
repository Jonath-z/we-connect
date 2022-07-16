import React from "react";
import { NextPage } from "next";
import HomePage from "../../components/HomePage";
import MouveOnScreenProvider from "lib/contexts/MouveOnScreenContext";

const Home: NextPage = () => {
  return (
    <MouveOnScreenProvider>
      <HomePage />
    </MouveOnScreenProvider>
  );
};

export default Home;
