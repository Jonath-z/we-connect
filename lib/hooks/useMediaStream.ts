import React, { useEffect, useRef, useState } from "react";

const useMediaStream = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cameraStream = useRef<any>(null);
  const mediaRecorder = useRef<any>(null);
  const blobRecorded = useRef<any>([]);
  const [streamType, setStreamType] = useState({
    video: true,
    audio: true,
  });

  useEffect(() => {
    (async () => {
      cameraStream.current = await navigator.mediaDevices.getUserMedia(
        streamType
      );
      if (videoRef.current) videoRef.current.srcObject = cameraStream.current;

      mediaRecorder.current = new MediaRecorder(cameraStream.current, {
        mimeType: "video/webm",
      });

      mediaRecorder.current.addEventListener("dataavailable", (e: any) => {
        blobRecorded.current.push(e.data);
      });

      mediaRecorder.current.start(1000);
    })();
  }, [streamType]);

  return {
    videoRef,
    cameraStream,
    mediaRecorder,
    blobRecorded,
    setStreamType,
  };
};

export default useMediaStream;
