import CallRoom from "components/modules/CallRoom";
import ShowWidget from "components/modules/_modules/ShowWidget";
import { openCallRoomAtom, showChatAtom, userAccountAtom } from "lib/atoms";
import { useCallContext } from "lib/contexts/CallContext";
import { gunServices } from "lib/services/gunService";
import React, { FC, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import ChatSection from "./ChatSection";
import ContactSection from "./ContactSection";

interface IProps {
  userId: string;
}

const HomePage: FC<IProps> = ({ userId }) => {
  const [isChatShowed, setIsChatShowed] = useRecoilState(showChatAtom);
  const callRoom = useRecoilValue(openCallRoomAtom);
  const [userAccount, setUserAccount] = useRecoilState(userAccountAtom);

  const { inComingCallInfo } = useCallContext();

  const [accountFound, setAccoutFound] = useState(true);

  const redirectToAuthPage = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  useEffect(() => {
    gunServices.findUserById(userId, (user) => {
      if (!user) {
        setAccoutFound(false);
        setUserAccount(null);
        setTimeout(redirectToAuthPage, 5000);
      } else {
        setUserAccount(user);
        setAccoutFound(true);
      }
    });
  }, [setUserAccount, userId]);

  useEffect(() => {
    console.log("accout found", accountFound);
  }, [accountFound]);

  return (
    <>
      <ShowWidget condition={accountFound}>
        <div
          className={`h-screen flex bg-gradient-to-tr from-blue-400 via-sky-500 to-blue-600 md:bg-light overflow-x-hidden`}
        >
          <div
            className={`w-2/5 h-full overflow-y-auto mobilemd:w-full ${
              isChatShowed && "-translate-x-full w-full mobile:transition-all"
            }`}
          >
            <ContactSection />
          </div>
          <div
            className={`${
              isChatShowed &&
              "transition-all mobile:fixed mobile:h-full w-3/5 mx-5 mobile:mx-0 overflow-y-auto mobile:w-full"
            }`}
          >
            {isChatShowed ? (
              <ChatSection onRedirectToChat={() => setIsChatShowed(false)} />
            ) : (
              <div className="flex justify-center items-center h-full mobile:hidden">
                <p className="bg-white p-2 rounded-2xl shadow-xl font-bold hover:cursor-not-allowed">
                  Click To Contact to start messaging
                </p>
              </div>
            )}
          </div>
        </div>
        {callRoom.isOpened && (
          <CallRoom
            roomType={callRoom.roomType}
            from={inComingCallInfo.from}
            to={inComingCallInfo.to}
          />
        )}
      </ShowWidget>

      <ShowWidget condition={!accountFound}>
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

export default HomePage;
