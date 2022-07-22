import { openCallRoomAtom } from "lib/atoms";
import callServices from "lib/services/callServices";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSetRecoilState } from "recoil";
import Peer from "simple-peer";
import { io } from "socket.io-client";

const socket = io("http://localhost:3300");

interface ICallContext {
  cameraStream: any | null;
  videoContainerRef: React.RefObject<HTMLVideoElement> | null;
  mediaRecorder: any | null;
  blobRecorded: React.MutableRefObject<any> | null;
  isinComingCall: boolean;
  setStreamType: Dispatch<SetStateAction<{ video: boolean; audio: boolean }>>;
  streamType: {
    video: boolean;
    audio: boolean;
  };
  inComingCallInfo: {
    from: string;
    to: string;
  };
  requestCall: () => void;
  cancelCall: () => void;
  answerCall: () => void;
}

const defaultContext: ICallContext = {
  cameraStream: null,
  videoContainerRef: null,
  mediaRecorder: null,
  blobRecorded: null,
  isinComingCall: false,
  streamType: {
    video: true,
    audio: true,
  },
  inComingCallInfo: {
    from: "",
    to: "",
  },
  setStreamType: () => null,
  requestCall: () => null,
  cancelCall: () => null,
  answerCall: () => null,
};

const CallContext = createContext<ICallContext>(defaultContext);

export const useCallContext = () => useContext(CallContext);

const CallProvider = ({ children }: any) => {
  const cameraStream = useRef<any>(null);
  const videoContainerRef = useRef<HTMLVideoElement>(null);
  const mediaRecorder = useRef<any>(null);
  const blobRecorded = useRef<any>([]);
  const [isinComingCall, setIsinComingCall] = useState(false);

  const [inComingCallInfo, setinComingCallInfo] = useState({
    from: "",
    to: "",
    signal: null,
  });

  const [streamType, setStreamType] = useState({
    video: true,
    audio: true,
  });

  const openCallRoom = useSetRecoilState(openCallRoomAtom);

  const getMediaSteam = useCallback(() => {
    (async () => {
      cameraStream.current = await navigator.mediaDevices.getUserMedia(
        streamType
      );

      if (videoContainerRef.current)
        videoContainerRef.current.srcObject = cameraStream.current;

      mediaRecorder.current = new MediaRecorder(cameraStream.current, {
        mimeType: "video/webm",
      });

      mediaRecorder.current.addEventListener("dataavailable", (e: any) => {
        blobRecorded.current.push(e.data);
      });

      mediaRecorder.current.start(1000);
    })();
  }, [streamType]);

  const requestCall = () => {
    openCallRoom(true);
    getMediaSteam();
    setIsinComingCall(false);

    const peer = new Peer({ initiator: true, stream: cameraStream.current });

    peer.on("signal", (data) => {
      socket.emit("requestCall", {
        from: "jonathan",
        to: "john doe",
        signal: data,
      });

      console.log("outgoing call", data);
    });

    // callServices.requestCall("jonathan", "john doe", cameraStream.current);

    socket.on("callAccepted", (data) => {
      peer.signal(data.signal);
    });
  };

  const cancelCall = () => {
    console.log("canceled");
    socket.emit("cancelCall", { from: "jonathan", to: "john doe" });

    openCallRoom(false);

    cameraStream.current
      .getTracks()
      .forEach((track: { stop: () => any }) => track.stop());
  };

  const answerCall = () => {
    console.log("answered");
    const peer = new Peer({ initiator: false, stream: cameraStream.current });

    peer.on("signal", (data) => {
      socket.emit("answerCall", {
        from: "jonathan",
        to: "john doe",
        signal: data,
      });
    });

    peer.on("stream", (currentStream) => {
      if (videoContainerRef.current)
        videoContainerRef.current.srcObject = currentStream;

      console.log("current stream", currentStream);
    });

    if (inComingCallInfo.signal) peer.signal(inComingCallInfo.signal);
  };

  useEffect(() => {
    socket.on("incomingCall", (data) => {
      console.log("incoming data", data);
      if (data.from === "jonathan") {
        setIsinComingCall(true);
        openCallRoom(true);
        setinComingCallInfo({
          from: data.from,
          to: data.to,
          signal: data.signal,
        });
      }
    });

    socket.on("leaveCall", (data) => {
      console.log("leave call data", data);
      if (data.to === "john doe") {
        openCallRoom(false);
        cameraStream.current
          .getTracks()
          .forEach((track: { stop: () => any }) => track.stop());
      }
    });
  }, []);

  return (
    <CallContext.Provider
      value={{
        videoContainerRef,
        blobRecorded,
        cameraStream,
        mediaRecorder,
        isinComingCall,
        requestCall,
        cancelCall,
        answerCall,
        setStreamType,
        streamType,
        inComingCallInfo,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

export default CallProvider;
