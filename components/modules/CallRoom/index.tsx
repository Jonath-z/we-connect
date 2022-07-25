/* eslint-disable @next/next/no-img-element */
// import useMouveOnScreen from "lib/hooks/useMouveOnScreen";
import { minifyCallRoomAtom } from "lib/atoms";
import { useCallContext } from "lib/contexts/CallContext";
import { useMouveOnScreen } from "lib/contexts/MouveOnScreenContext";
import callServices from "lib/services/callServices";
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
  from: string;
  to: string;
}

const CallRoom = ({ roomType, from, to }: IProps) => {
  const [videoMuted, setVideoMuted] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);

  const [isMinified, setIsMinified] = useRecoilState(minifyCallRoomAtom);

  const {
    videoContainerRef,
    cameraStream,
    mediaRecorder,
    blobRecorded,
    setStreamType,
    streamType,
    cancelCall,
    isinComingCall,
    answerCall,
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

        {isinComingCall && (
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

        <div
          className={` ${
            !isMinified ? "absolute top-0 bottom-0 left-0 right-0" : "hidden"
          }`}
        >
          <video
            ref={videoContainerRef}
            className="w-full h-full object-cover"
            autoPlay
            controls={false}
          ></video>
        </div>

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

            <li
              onClick={() => {
                !isinComingCall ? cancelCall() : answerCall();
                // if(!isinComingCall)
              }}
              className={
                isMoving
                  ? "hidden transition-all"
                  : "bg-red-600 text-light p-5 rounded-full transition-all"
              }
            >
              <VPhone />
            </li>

            {isMinified && (
              <div
                onTouchEnd={(e) => {
                  onTouchend(e);
                  if (patternOutsideview && cameraStream.current) {
                    cancelCall();
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

//   cameraStream.current
//     .getTracks()
//     .forEach((track: { stop: () => any }) => track.stop());
// }

export default CallRoom;
