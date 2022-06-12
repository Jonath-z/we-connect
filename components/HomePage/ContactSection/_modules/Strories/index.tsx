import React from "react";
import { user } from "components/assets/dummy_data/user";
import StoryCard from "components/modules/_modules/Cards/StoryCard";
import { VPlus } from "components/modules/_modules/vectors";

const Stories = () => {
  const { stories } = user;
  return (
    <div className="bg-dark">
      <div className="w-full overflow-x-auto flex flex-col flex-wrap h-20">
        {stories.map((story, index) => {
          return (
            <div
              key={index}
              className="border-primary border-2 p-1 w-fit rounded-full mx-2"
            >
              <StoryCard storyUrl={story.storyUrl}>
                {/* <p>{story?.storyDescription}</p> */}
              </StoryCard>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stories;
