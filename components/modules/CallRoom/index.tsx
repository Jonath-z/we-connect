// import useMouveOnScreen from "lib/hooks/useMouveOnScreen";
import { callRoomAtom } from "lib/atoms";
import { useMouveOnScreen } from "lib/contexts/MouveOnScreenContext";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  VArrowLeft,
  VArrowMinify,
  VCamera,
  VVideoOff,
  VMicrophone,
  VMicrophoneOff,
  VPhone,
  VVideo,
  VDragAndDrop,
} from "../_modules/vectors";

interface IProps {
  roomType: string;
}

const CallRoom = ({ roomType }: IProps) => {
  const [micMuted, setMicMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const [isMinified, setIsMinified] = useRecoilState(callRoomAtom);

  const { onTouchmouve, onTouchStart, onTouchend, movingPatternRef, isMoving } =
    useMouveOnScreen();

  return (
    <div
      className={
        isMoving
          ? "h-full w-full bg-black bg-opacity-40 z-30 fixed top-0 left-0 bottom-0 right-0"
          : ""
      }
    >
      <div
        ref={movingPatternRef}
        className={`${
          isMinified
            ? `fixed flex flex-col h-fit w-fit z-30 left-0 right-0 transition-all`
            : "bg-black bg-opacity-40 fixed transition-all top-0 bottom-0 left-0 right-0 w-full h-full flex flex-col justify-between backdrop-blur callRoom"
        }`}
      >
        {!isMinified && (
          <div className="m-5 text-white">
            <VArrowLeft />
          </div>
        )}
        <div>
          <ul
            className={`${
              isMinified
                ? "flex flex-col p-3 bg-white gap-3 rounded-3xl transition-all text-sm"
                : "flex justify-center gap-5 py-5 transition-all text-xl"
            }`}
          >
            {!isMinified && (
              <li
                onClick={() => setMicMuted(!micMuted)}
                className={
                  isMoving
                    ? "hidden transition-all"
                    : "bg-red-600 text-light p-5 rounded-full transition-all"
                }
              >
                {micMuted ? <VMicrophoneOff /> : <VMicrophone />}
              </li>
            )}
            <li
              className={
                isMoving
                  ? "hidden transition-all"
                  : "bg-green-600 text-light p-5 rounded-full transition-all"
              }
            >
              <VPhone />
            </li>
            <li
              onClick={() => setVideoMuted(!videoMuted)}
              className={
                isMoving
                  ? "hidden transition-all"
                  : "bg-red-600 text-light p-5 rounded-full transition-all"
              }
            >
              {videoMuted ? <VVideoOff /> : <VVideo />}
            </li>
            <li
              onClick={() => setIsMinified(!isMinified)}
              className={
                isMoving
                  ? "hidden transition-all"
                  : "bg-blue-600 text-light p-5 rounded-full transition-all"
              }
            >
              {<VArrowMinify />}
            </li>

            {isMinified && (
              <div
                onTouchEnd={onTouchend}
                onTouchMove={onTouchmouve}
                onTouchStart={onTouchStart}
              >
                <li className="text-dark border border-gray-400 p-5 rounded-full">
                  {<VDragAndDrop />}
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CallRoom;
