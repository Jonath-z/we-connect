/* eslint-disable @next/next/no-img-element */
import React from "react";

interface IProps {
  storyUrl: string;
  children?: any;
}

const StoryCard = ({ storyUrl, children }: IProps) => {
  return (
    <div className="border-primary border-2 p-1 w-fit rounded-full">
      <img
        src={storyUrl}
        alt="story"
        className="w-14 h-14 rounded-full object-cover"
      />
      {children}
    </div>
  );
};

export default StoryCard;
