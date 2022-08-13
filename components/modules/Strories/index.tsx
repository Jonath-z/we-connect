import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import StoryCard from "components/modules/_modules/Cards/StoryCard";
import Storyview from "../StoryView";
import { VPlus } from "../_modules/vectors";
import { TStory, TUser } from "lib/types";
import { ISaveStory } from "lib/models";
import { useMessage } from "lib/contexts/MessageContext";
import { orderObject } from "lib/helper";
import dateServices from "lib/services/dateService";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAccountAtom } from "lib/atoms";
import base64ToObjectUrl from "lib/helper/base64ToObjectUrl";

interface IProps {
  isSeeAll: boolean;
  setIsSeeAll: Dispatch<SetStateAction<boolean>>;
}

const Stories = ({ isSeeAll, setIsSeeAll }: IProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isStoryView, setIsStoryView] = useState(false);

  // const { stories, username } = user;
  const { saveStory } = useMessage();
  const [userAccount, setUserAccount] = useRecoilState(userAccountAtom);

  const onUpploadNewStory = (e: any) => {
    const file = e?.target.files[0];

    if (file.type.match("image.*")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64ImageString = reader.result;

        const story: ISaveStory = {
          storyUrl: base64ImageString as string,
          expirationDate: dateServices.getDateAfter24h(),
          storyOwner: userAccount!.id,
          storyDescription: "",
          storyType: file.type,
        };

        console.log("new story", story);

        saveStory(orderObject(story));
        // setUserAccount((prevAccountState: any) => {
        //   const newState = prevAccountState?.stories?.push(orderObject(story));

        //   return newState;
        // });
      };
    } else {
      console.log("file don't match");
    }
  };

  const toggleStoryView = () => {
    setIsStoryView(!isStoryView);
    setIsSeeAll(!isSeeAll);
  };

  return (
    <div>
      <div
        className={`w-full overflow-x-auto flex ${
          !isSeeAll && "h-24"
        } items-center`}
      >
        <div className="flex flex-col items-center ml-2">
          <div
            role="button"
            onKeyDown={() => null}
            onClick={() => inputFileRef.current?.click()}
            className="w-16 h-16 flex justify-center items-center border-2 border-primary rounded-full"
          >
            <VPlus className="text-4xl text-white" />
            <input
              ref={inputFileRef}
              onChange={onUpploadNewStory}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>
          <p className="text-xs text-white pt-1 px-2">My story</p>
        </div>
        {userAccount?.stories?.map((story, index) => {
          return (
            <>
              <div
                onClick={toggleStoryView}
                role="button"
                onKeyDown={() => null}
                key={index}
                className={`mx-2 relative flex w-fit ${
                  isSeeAll
                    ? "my-1 flex-row items-center"
                    : "items-center flex-col"
                }`}
              >
                <StoryCard storyUrl={base64ToObjectUrl(story.storyUrl)!} />
                <p className="text-light text-xs pt-1 px-2">
                  {userAccount.username}
                </p>
              </div>
              {isStoryView && (
                <Storyview
                  story={userAccount.stories!}
                  toggleStoryView={toggleStoryView}
                />
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Stories;
