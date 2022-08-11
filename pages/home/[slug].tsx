import React, { useEffect } from "react";
import { NextPage } from "next";
import HomePage from "../../components/HomePage";
import MouveOnScreenProvider from "lib/contexts/MouveOnScreenContext";
import CallProvider from "lib/contexts/CallContext";
import { TUser } from "lib/types";
import apiServices from "lib/services/apiServices";
import ShowWidget from "components/modules/_modules/ShowWidget";
import MessageProvider from "lib/contexts/MessageContext";

const Home: NextPage<{ user: TUser }> = ({ user }) => {
  const redirectToAuthPage = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  useEffect(() => {
    console.log("user from slug", user);
  }, [user]);

  return (
    <>
      <ShowWidget condition={user !== null && user !== undefined}>
        <MouveOnScreenProvider>
          <CallProvider>
            <MessageProvider>
              <HomePage user={user} />
            </MessageProvider>
          </CallProvider>
        </MouveOnScreenProvider>
      </ShowWidget>

      <ShowWidget condition={!user}>
        <div className="fixed top-0 bottom-0 left-0 right-0 h-full w-full flex justify-center items-center bg-white/40 backdrop-blur-lg z-20">
          <div className="bg-gradient-to-tr from-blue-400 via-sky-500 to-blue-600 mx-5 p-3 rounded-lg text-white shadow-xl">
            <p className="text-center">
              Oups ! We are not able to find this account. Please relog in.
            </p>

            <button
              onClick={redirectToAuthPage}
              className="border w-full py-2 mt-5 rounded-md bg-white text-black font-bold"
            >
              Go to log in
            </button>
          </div>
        </div>
      </ShowWidget>
    </>
  );
};

export const getServerSideProps = async (context: {
  params: {
    slug: any;
  };
  req: any;
}) => {
  const { slug } = context.params;

  const { response, error } = await apiServices.findByTokenOrUsername(slug);

  if (error) {
    return {
      props: {
        user: null,
      },
    };
  } else {
    return {
      props: {
        user: response,
      },
    };
  }
};

export default Home;
