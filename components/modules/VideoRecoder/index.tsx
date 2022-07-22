import { useCallContext } from "lib/contexts/CallContext";
import { gunServices } from "lib/services/gunService";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { VPlus, VSend } from "../_modules/vectors";

interface IProps {
  isOpenVidepRecorder: boolean;
  setIsOpenVideoRecoder: Dispatch<SetStateAction<boolean>>;
}

const VideoRecoder = ({
  isOpenVidepRecorder,
  setIsOpenVideoRecoder,
}: IProps) => {
  const [videoLocalLink, setVideoLocalLink] = useState("");
  const [videoBased64String, setVideoBased64Strig] = useState("");

  const { videoContainerRef, mediaRecorder, blobRecorded, cameraStream } =
    useCallContext();

  const stopRecoder = () => {
    if (blobRecorded?.current) {
      mediaRecorder.current.addEventListener("stop", () => {
        const blob = new Blob(blobRecorded.current, { type: "video/webm" });

        let localVideo = URL.createObjectURL(blob);
        setVideoLocalLink(localVideo);

        let reader = new FileReader();
        reader.readAsDataURL(blob);

        reader.onloadend = () => {
          const base64VideoString = reader.result;

          const message = {
            senderUsername: "John Doe",
            senderId: "Doe---id",
            receiverUsername: "John Doe",
            receiverId: "zizou_id",
            isVideo: true,
            message: base64VideoString,
            date: Date.now().toLocaleString(),
            time: Date.now().toLocaleString(),
          };

          gunServices.sendMessage(message);

          setVideoBased64Strig(base64VideoString as string);
        };
      });

      setIsOpenVideoRecoder(false);

      cameraStream.current
        .getTracks()
        .forEach((track: { stop: () => any }) => track.stop());
    }
  };

  const onCancelVideoRecoder = () => {
    setIsOpenVideoRecoder(false);

    cameraStream.current
      .getTracks()
      .forEach((track: { stop: () => any }) => track.stop());
  };

  return (
    <div className="fixed top-0 bottom-10 w-full h-full backdrop-blur-sm flex flex-col justify-center items-center gap-5 px-5 bg-white bg-opacity-30">
      <video
        ref={videoContainerRef}
        className="rounded-lg"
        autoPlay
        controls={false}
      ></video>
      <div className="flex justify-center items-center gap-10">
        <button
          className="bg-red-500 p-5 rounded-full text-white shadow-md -rotate-45 text-2xl"
          onClick={onCancelVideoRecoder}
        >
          <VPlus />
        </button>
        <button
          onClick={stopRecoder}
          className="bg-blue-500 p-5 rounded-full text-white shadow-md text-2xl"
        >
          <VSend />
        </button>
      </div>
    </div>
  );
};

export default VideoRecoder;
