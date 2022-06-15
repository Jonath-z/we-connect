import React, { useState } from "react";
import { user } from "components/assets/dummy_data/user";
import StoryCard from "components/modules/_modules/Cards/StoryCard";
import Storyview from "../StoryView";

interface IProps {
  isSeeAll: boolean;
  toggleStoryView: () => void;
}

const Stories = ({ isSeeAll, toggleStoryView }: IProps) => {
  const [isStoryView, setIsStoryView] = useState(false);

  const { stories, username } = user;

  return (
    <div className="bg-dark">
      <div
        className={`w-full overflow-x-auto flex flex-col flex-wrap ${
          !isSeeAll && "h-28"
        }`}
      >
        {stories.map((story, index) => {
          return (
            <div
              onClick={toggleStoryView}
              role="button"
              onKeyDown={() => null}
              key={index}
              className={`mx-2 relative flex ${
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
