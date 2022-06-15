/* eslint-disable @next/next/no-img-element */
import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { VClose } from "../_modules/vectors";

interface IProps {
  story: {
    storyUrl: string;
    storyDescription: string;
  }[];
  toggleStoryView: () => void;
}

const Storyview = ({ story, toggleStoryView }: IProps) => {
  const [progressRef, setProgressRef] = useState<any[]>([]);
  const storyIndex = useRef(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const handleStatusDuration = useCallback(() => {
    if (progressRef.length) {
      let width = 1;
      const progression = () => {
        if (width >= 100) {
          clearInterval(interval);
        }
        width++;
        if (progressRef[currentStoryIndex].current)
          progressRef[currentStoryIndex].current.style.width = width + "%";
      };
      const interval = setInterval(progression, 50);
    }
  }, [currentStoryIndex, progressRef]);

  console.log("current story index", currentStoryIndex);

  useEffect(() => {
    handleStatusDuration();
  }, [handleStatusDuration]);

  useEffect(() => {
    const callback = () => {
      if (storyIndex.current === story.length - 1) {
        storyIndex.current = 0;
        setCurrentStoryIndex(0);
        clearTimeout(timer);
        toggleStoryView();
      }
      storyIndex.current++;
      setCurrentStoryIndex(storyIndex.current);
    };
    const timer = setTimeout(callback, 5000);
    return () => clearTimeout(timer);
  }, [progressRef, story.length, toggleStoryView, currentStoryIndex]);

  useEffect(() => {
    setProgressRef((progressRef) =>
      story.map((_, index) => progressRef[index] || createRef())
    );
  }, [story]);

  return (
    <div className="fixed h-screen w-full z-20 top-0">
      <p
        onClick={toggleStoryView}
        role="button"
        onKeyDown={() => null}
        className="z-20 fixed bg-dark top-0 w-fit text-center text-light p-2 my-5 mx-3 bg-opacity-50 rounded-full backdrop-blur-md text-xs cursor-pointer"
      >
        <VClose />
      </p>
      <div className="z-20 fixed bg-dark top-0 w-full text-center p-1 m-0 bg-opacity-20 backdrop-blur-md text-xs cursor-pointer">
        <div className="flex">
          {story.map((_, index) => {
            return (
              <div
                key={index}
                className="w-full mx-1 rounded-full bg-primary bg-opacity-50"
              >
                <div
                  ref={progressRef[index]}
                  className="h-1 bg-primary rounded-full w-0"
                />
              </div>
            );
          })}
        </div>
      </div>
      <img
        src={story[currentStoryIndex].storyUrl}
        alt="story"
        className="h-full w-full object-cover"
      />
      <p className="z-20 fixed bg-dark bottom-0 w-full text-center text-light py-10 bg-opacity-50 rounded-t-xl backdrop-blur-md text-xs">
        {story[currentStoryIndex].storyDescription}
      </p>
    </div>
  );
};

export default Storyview;
