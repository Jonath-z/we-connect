// import useMouveOnScreen from "lib/hooks/useMouveOnScreen";
import { minifyCallRoomAtom } from "lib/atoms";
import { useMouveOnScreen } from "lib/contexts/MouveOnScreenContext";
import useMediaStream from "lib/hooks/useMediaStream";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  VArrowLeft,
  VArrowMinify,
  VVideoOff,
  VMicrophone,
  VMicrophoneOff,
  VPhone,
  VVideo,
  VDragAndDrop,
  VZoomOut,
} from "../_modules/vectors";

interface IProps {
  roomType: string;
}

const CallRoom = ({ roomType }: IProps) => {
  const [micMuted, setMicMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const [isMinified, setIsMinified] = useRecoilState(minifyCallRoomAtom);
  const { videoRef, cameraStream, mediaRecorder, blobRecorded, setStreamType } =
    useMediaStream();

  const {
    onTouchmouve,
    onTouchStart,
    onTouchend,
    movingPatternRef,
    isMoving,
    patternOutsideview,
  } = useMouveOnScreen();

  useEffect(() => {
    console.log("pattern outide of view", patternOutsideview);
  }, [patternOutsideview]);

  const onRemoveVideo = () => {
    setStreamType({ video: false, audio: true });
    setVideoMuted(!videoMuted);
  };

  const onRemoveAudio = () => {
    setStreamType({ video: true, audio: false });
    setVideoMuted(!videoMuted);
  };

  return (
    <div
      className={
        isMoving
          ? `h-full w-full bg-opacity-40 z-30 fixed top-0 left-0 bottom-0 right-0 transition-all ${
              patternOutsideview
                ? "bg-red-400 border border-red-600"
                : "bg-black"
            }`
          : ""
      }
    >
      <div
        ref={movingPatternRef}
        className={`${
          isMinified
            ? `fixed flex flex-col h-fit w-fit z-30 left-0 top-0 right-0 transition-all`
            : "bg-black bg-opacity-40 fixed transition-all top-0 bottom-0 left-0 right-0 w-full h-full flex flex-col justify-between backdrop-blur callRoom"
        }`}
      >
        {!isMinified && (
          <div
            role="button"
            onKeyDown={() => null}
            onClick={() => setIsMinified(true)}
            className="m-5 text-white z-20"
          >
            <VArrowLeft />
          </div>
        )}
        {/* {!isMinified && ( */}
        <div
          className={` ${
            !isMinified ? "absolute top-0 bottom-0 left-0 right-0" : "hidden"
          }`}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            controls={false}
          ></video>
        </div>
        {/* )} */}
        <div className="z-20">
          <ul
            className={`${
              isMinified
                ? `flex flex-col p-3 bg-white gap-3 shadow-lg border ${
                    isMoving ? "rounded-full" : "rounded-3xl"
                  } transition-all text-sm`
                : "flex justify-center gap-5 py-5 transition-all text-xl"
            }`}
          >
            {!isMinified && (
              <li
                onClick={onRemoveAudio}
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
              onClick={onRemoveVideo}
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
              {isMinified ? <VZoomOut /> : <VArrowMinify />}
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
