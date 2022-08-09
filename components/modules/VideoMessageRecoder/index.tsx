import { messageAtom, userAccountAtom } from "lib/atoms";
import { useMessage } from "lib/contexts/MessageContext";
import { orderObject } from "lib/helper";
import cryptoServices from "lib/helper/cryptoServices";
import dateServices from "lib/services/dateService";
import { TMessage, TUser } from "lib/types";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { VPlus, VSend } from "../_modules/vectors";

interface IProps {
  isOpenVidepRecorder: boolean;
  setIsOpenVideoRecoder: Dispatch<SetStateAction<boolean>>;
  contact: TUser;
}

const VideoMessageRecoder = ({
  isOpenVidepRecorder,
  setIsOpenVideoRecoder,
  contact,
}: IProps) => {
  const [videoLocalLink, setVideoLocalLink] = useState("");
  const [videoBased64String, setVideoBased64Strig] = useState("");

  const cameraStream = useRef<any>(null);
  const videoContainerRef = useRef<HTMLVideoElement>(null);
  const mediaRecorder = useRef<any>(null);
  const blobRecorded = useRef<any>([]);

  const userAccount = useRecoilValue(userAccountAtom);
  const [messages, setMessages] = useRecoilState(messageAtom);

  const { sendMessage } = useMessage();

  useEffect(() => {
    (async () => {
      cameraStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      if (videoContainerRef.current)
        videoContainerRef.current.srcObject = cameraStream.current;

      console.log("media stream", cameraStream.current);

      mediaRecorder.current = new MediaRecorder(cameraStream.current, {
        mimeType: "video/webm",
      });

      mediaRecorder.current.addEventListener("dataavailable", (e: any) => {
        blobRecorded.current.push(e.data);
      });

      mediaRecorder.current.start(1000);
    })();
  }, []);

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

          const message: TMessage = {
            sender: userAccount?.username!,
            senderId: userAccount?.id!,
            receiver: contact.username,
            receiverId: contact.id,
            isVideo: true,
            isImage: false,
            message: cryptoServices.encrypt(base64VideoString as string)!,
            date: dateServices.getFullDate(),
            time: dateServices.getTime(),
          };

          sendMessage(orderObject(message));
          messages && setMessages([...messages, message]);

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

export default VideoMessageRecoder;
