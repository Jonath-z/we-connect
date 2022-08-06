import React from "react";
import { NextPage } from "next";
import HomePage from "../../components/HomePage";
import MouveOnScreenProvider from "lib/contexts/MouveOnScreenContext";
import CallProvider from "lib/contexts/CallContext";

const Home: NextPage<{ userId: string }> = ({ userId }) => {
  return (
    <MouveOnScreenProvider>
      <CallProvider>
        <HomePage userId={userId} />
      </CallProvider>
    </MouveOnScreenProvider>
  );
};

export const getServerSideProps = (context: {
  params: {
    slug: any;
  };
  req: any;
}) => {
  const { slug } = context.params;

  return {
    props: {
      userId: slug,
    },
  };
};

export default Home;
