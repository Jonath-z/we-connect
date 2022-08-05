import { openCallRoomAtom } from "lib/atoms";
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

export const socket = io("http://localhost:3300");

interface ICallContext {
  cameraStream: any | null;
  videoContainerRef: React.RefObject<HTMLVideoElement> | null;
  mediaRecorder: any | null;
  blobRecorded: React.MutableRefObject<any> | null;
  isinComingCall: boolean;
  callAccepted: boolean;
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
  callAccepted: false,
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
  const connectionRef = useRef<Peer.Instance>();
  const phoneCallAudioRingRef = useRef<HTMLAudioElement>(null);
  const cancelCallAudioRingRef = useRef<HTMLAudioElement>(null);

  const [isinComingCall, setIsinComingCall] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);

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

  const ringing = () => {
    if (phoneCallAudioRingRef.current) {
      phoneCallAudioRingRef.current.play();
    }
  };

  const stopRinging = () => {
    if (phoneCallAudioRingRef.current) {
      phoneCallAudioRingRef.current.pause();
    }
  };

  const leaveCallRingsHandler = () => {
    stopRinging();
    if (cancelCallAudioRingRef.current) {
      cancelCallAudioRingRef.current.play();
    }
  };

  const requestCall = () => {
    openCallRoom(true);
    getMediaSteam();
    setIsinComingCall(false);

    ringing();

    const peer = new Peer({
      initiator: true,
      stream: cameraStream.current,
      trickle: false,
    });

    peer.on("signal", (data) => {
      socket.emit("requestCall", {
        from: "jonathan",
        to: "john doe",
        signal: data,
      });

      console.log("outgoing call", data);
    });

    peer.on("stream", (currentStream) => {
      if (videoContainerRef.current)
        videoContainerRef.current.srcObject = currentStream;

      console.log("request get stream", currentStream);
    });

    socket.on("callAccepted", (data) => {
      peer.signal(data.signal);

      stopRinging();
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    getMediaSteam();

    const peer = new Peer({
      initiator: false,
      stream: cameraStream.current,
      trickle: false,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", {
        from: "jonathan",
        to: "john doe",
        signal: data,
      });

      console.log("answer signal", data);
    });

    peer.on("stream", (currentStream) => {
      if (videoContainerRef.current)
        videoContainerRef.current.srcObject = currentStream;

      console.log("current stream in answer", currentStream);
    });

    if (inComingCallInfo.signal) peer.signal(inComingCallInfo.signal);

    connectionRef.current = peer;
    setCallAccepted(true);
  };

  const cancelCall = () => {
    console.log("canceled");
    socket.emit("cancelCall", { from: "jonathan", to: "john doe" });

    leaveCallRingsHandler();

    openCallRoom(false);
    setIsinComingCall(false);
    setCallAccepted(false);

    if (cameraStream.current) {
      cameraStream.current
        .getTracks()
        .forEach((track: { stop: () => any }) => track.stop());
    }
  };

  useEffect(() => {
    socket.on("incomingCall", (data) => {
      console.log("incoming data", data);
      if (data.to === "john doe") {
        setIsinComingCall(true);
        openCallRoom(true);
        setinComingCallInfo({
          from: data.from,
          to: data.to,
          signal: data.signal,
        });
      }

      if (!callAccepted) {
        navigator.vibrate([400, 400]);
        console.log("it's vibrating");
      }
    });
  }, []);

  useEffect(() => {
    socket.on("leaveCall", (data) => {
      console.log("leave call data", data);

      leaveCallRingsHandler();

      if (data.to === "john doe") {
        openCallRoom(false);

        if (cameraStream.current) {
          cameraStream.current
            .getTracks()
            .forEach((track: { stop: () => any }) => track.stop());
        }

        connectionRef.current?.destroy();
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
        callAccepted,
        requestCall,
        cancelCall,
        answerCall,
        setStreamType,
        streamType,
        inComingCallInfo,
      }}
    >
      <audio
        src="/phone-call-ring.wav"
        ref={phoneCallAudioRingRef}
        onEnded={cancelCall}
        className="hidden"
      />

      <audio
        src="/cancel-call-ring.wav"
        ref={cancelCallAudioRingRef}
        loop={false}
        className="hidden"
      />
      {children}
    </CallContext.Provider>
  );
};

export default CallProvider;
