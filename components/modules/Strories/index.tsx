import React, { useState } from "react";
import { user } from "components/assets/dummy_data/user";
import StoryCard from "components/modules/_modules/Cards/StoryCard";
import Storyview from "../StoryView";
import { VPlus } from "../_modules/vectors";

interface IProps {
  isSeeAll: boolean;
  toggleStoryView: () => void;
}

const Stories = ({ isSeeAll, toggleStoryView }: IProps) => {
  const [isStoryView, setIsStoryView] = useState(false);

  const { stories, username } = user;

  return (
    <div>
      <div
        className={`w-full overflow-x-auto flex ${
          !isSeeAll && "h-24"
        } items-center`}
      >
        <div className="flex flex-col items-center ml-2">
          <div className="w-16 h-16 flex justify-center items-center border-2 border-primary rounded-full">
            <VPlus className="text-4xl text-white" />
          </div>
          <p className="text-xs text-white pt-1 px-2">My story</p>
        </div>
        {stories.map((story, index) => {
          return (
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
              <StoryCard storyUrl={story.storyUrl} />
              <p className="text-light text-xs pt-1 px-2">{username}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stories;
