/* eslint-disable @next/next/no-img-element */
import { minifyCallRoomAtom } from "lib/atoms";
import { useCallContext } from "lib/contexts/CallContext";
import { useMouveOnScreen } from "lib/contexts/MouveOnScreenContext";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  VArrowLeft,
  VArrowMinify,
  VVideoOff,
  VMicrophone,
  VMicrophoneOff,
  VVideo,
  VDragAndDrop,
  VZoomOut,
} from "../_modules/vectors";
import AcceptCallButton from "./___module/AcceptCallButton";
import RejectCallButton from "./___module/RejectCallButton";

interface IProps {
  roomType: string;
  from: string;
  to: string;
}

const CallRoom = ({ roomType, from, to }: IProps) => {
  const [videoMuted, setVideoMuted] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);

  const [isMinified, setIsMinified] = useRecoilState(minifyCallRoomAtom);

  const {
    streamedVideoContainerRef,
    transimittedVideoContainerRef,
    setStreamType,
    streamType,
    cancelCall,
    isinComingCall,
    answerCall,
    callAccepted,
  } = useCallContext();

  const {
    onTouchmouve,
    onTouchStart,
    onTouchend,
    movingPatternRef,
    isMoving,
    patternOutsideview,
  } = useMouveOnScreen();

  const onRemoveVideo = () => {
    setStreamType({ video: !streamType.video, audio: true });
    setVideoMuted(!videoMuted);
  };

  const onRemoveAudio = () => {
    setStreamType({ video: true, audio: !streamType.audio });
    setAudioMuted(!audioMuted);
  };

  return (
    <div
      className={
        isMoving
          ? `h-full w-full bg-opacity-40 z-50 fixed top-0 left-0 bottom-0 right-0 transition-all ${
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

        {isinComingCall && !callAccepted && (
          <div
            className={`flex flex-col z-20 justify-center top-0 items-center h-full w-full absolute ${
              isMinified ? "hidden" : ""
            }`}
          >
            <h2 className="text-center text-white py-2 font-bold">
              Incoming call from {from}
            </h2>
            <div>
              <img
                src={
                  "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2022/03/bored-ape-nft.jpg"
                }
                alt={from}
                className="h-40 w-40 rounded-full object-cover"
              />
            </div>
          </div>
        )}

        {roomType === "video" ? (
          <div className={` ${!isMinified ? "" : "hidden"}`}>
            <video
              ref={streamedVideoContainerRef}
              className="w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
              autoPlay
              controls={false}
            ></video>

            <video
              ref={transimittedVideoContainerRef}
              className="w-32 h-64 object-cover border shadow-md fixed ml-3 rounded-xl"
              autoPlay
              controls={false}
            ></video>
          </div>
        ) : (
          <div className="flex flex-col z-20 justify-center top-0 items-center h-full w-full absolute">
            <img
              src={
                "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2022/03/bored-ape-nft.jpg"
              }
              alt={from}
              className="h-40 w-40 rounded-full object-cover"
            />
          </div>
        )}

        <div className="z-20 bg-white rounded-t-2xl">
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
                    : "bg-black text-light p-5 rounded-full transition-all"
                }
              >
                {audioMuted ? <VMicrophoneOff /> : <VMicrophone />}
              </li>
            )}
            {roomType === "video" && (
              <li
                onClick={onRemoveVideo}
                className={
                  isMoving
                    ? "hidden transition-all"
                    : "bg-black text-light p-5 rounded-full transition-all"
                }
              >
                {videoMuted ? <VVideoOff /> : <VVideo />}
              </li>
            )}
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

            <li className={isMoving ? "hidden transition-all" : ""}>
              {isinComingCall && !callAccepted && (
                <AcceptCallButton onClick={() => answerCall(roomType)} />
              )}

              {(!isinComingCall || callAccepted) && (
                <RejectCallButton
                  onClick={() => {
                    isinComingCall ? cancelCall(from) : cancelCall(to);
                  }}
                />
              )}
            </li>

            {isMinified && (
              <div
                onTouchEnd={(e) => {
                  onTouchend(e);
                  if (patternOutsideview) {
                    isinComingCall ? cancelCall(from) : cancelCall(to);
                  }
                }}
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
