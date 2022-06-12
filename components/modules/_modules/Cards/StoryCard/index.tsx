/* eslint-disable @next/next/no-img-element */
import React from "react";

interface IProps {
  storyUrl: string;
  children?: any;
}

const StoryCard = ({ storyUrl, children }: IProps) => {
  return (
    <div>
      <img
        src={storyUrl}
        alt="story"
        className="w-16 h-16 rounded-full object-cover"
      />
      {children}
    </div>
  );
};

export default StoryCard;
