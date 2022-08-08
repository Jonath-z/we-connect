import { openCallRoomAtom, userAccountAtom } from "lib/atoms";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import Peer from "simple-peer";
import { io } from "socket.io-client";

export const socket = io("http://localhost:3300");

interface ICallContext {
  cameraStream: any | null;
  streamedVideoContainerRef: React.RefObject<HTMLVideoElement> | null;
  transimittedVideoContainerRef: React.RefObject<HTMLVideoElement> | null;
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
  requestCall: (roomType: string) => void;
  answerCall: (roomType: string) => void;
  cancelCall: () => void;
}

const defaultContext: ICallContext = {
  cameraStream: null,
  streamedVideoContainerRef: null,
  transimittedVideoContainerRef: null,
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
  const streamedVideoContainerRef = useRef<HTMLVideoElement>(null);
  const transimittedVideoContainerRef = useRef<HTMLVideoElement>(null);
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

  const [callRoomOpened, openCallRoom] = useRecoilState(openCallRoomAtom);
  const userAccount = useRecoilValue(userAccountAtom);

  const getMediaSteam = async (callType: string) => {
    cameraStream.current = await navigator.mediaDevices.getUserMedia(
      callType === "video"
        ? streamType
        : {
            video: false,
            audio: true,
          }
    );

    console.log("camera stream when getting media", cameraStream.current);

    if (transimittedVideoContainerRef.current) {
      console.log("transmitted stream", cameraStream.current);
      transimittedVideoContainerRef.current.srcObject = cameraStream.current;
    }

    mediaRecorder.current = new MediaRecorder(cameraStream.current, {
      mimeType: "video/webm",
    });

    mediaRecorder.current.addEventListener("dataavailable", (e: any) => {
      blobRecorded.current.push(e.data);
    });

    mediaRecorder.current.start(1000);

    return cameraStream.current;
  };

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

  const requestCall = useCallback(
    async (roomType: string) => {
      openCallRoom({ roomType, isOpened: true });
      const stream = await getMediaSteam(roomType);
      setIsinComingCall(false);

      ringing();

      const peer = new Peer({
        initiator: true,
        stream,
        trickle: false,
      });

      peer.on("signal", (data) => {
        socket.emit("requestCall", {
          from: "jonathan",
          to: "john doe",
          signal: data,
          callType: roomType,
        });
      });

      peer.on("stream", (currentStream) => {
        if (streamedVideoContainerRef.current)
          streamedVideoContainerRef.current.srcObject = currentStream;

        console.log("request get stream", currentStream);
      });

      socket.on("callAccepted", (data) => {
        console.log(
          "call signal in request after accepting must be response",
          data.signal
        );
        peer.signal(data.signal);

        stopRinging();
      });

      connectionRef.current = peer;
    },
    [streamType]
  );

  const answerCall = async (roomType: string) => {
    const stream = await getMediaSteam(roomType);

    const peer = new Peer({
      initiator: false,
      stream,
      trickle: false,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", {
        from: "jonathan",
        to: "john doe",
        signal: data,
        roomType,
      });
    });

    peer.on("stream", (currentStream) => {
      if (streamedVideoContainerRef.current)
        streamedVideoContainerRef.current.srcObject = currentStream;

      console.log("current stream in answer", currentStream);
    });

    if (inComingCallInfo.signal) {
      console.log(
        "call signal in answer must be request",
        inComingCallInfo.signal
      );
      peer.signal(inComingCallInfo.signal);
    }

    connectionRef.current = peer;
    setCallAccepted(true);
  };

  const closeCallRoom = () => {
    openCallRoom({ roomType: "audio" || "video", isOpened: false });
  };

  const cancelCall = () => {
    console.log("canceled");
    socket.emit("cancelCall", { from: "jonathan", to: "john doe" });

    leaveCallRingsHandler();
    closeCallRoom();

    setIsinComingCall(false);
    setCallAccepted(false);

    if (cameraStream.current) {
      cameraStream.current
        .getTracks()
        .forEach((track: { stop: () => any }) => track.stop());
    }

    connectionRef.current?.destroy();
  };

  useEffect(() => {
    socket.on("connect", () => {
      if (userAccount) {
        socket.emit("newConnection", {
          username: userAccount.username,
          userToken: userAccount.userToken,
          userSocketId: socket.id,
        });
      }
    });
  }, [userAccount]);

  useEffect(() => {
    socket.on("incomingCall", (data) => {
      console.log("incoming data", data);
      if (data.to === "john doe") {
        setIsinComingCall(true);
        openCallRoom({ roomType: data.callType, isOpened: true });
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

    socket.on("leaveCall", (data) => {
      console.log("leave call data", data);

      leaveCallRingsHandler();

      if (data.to === "john doe") {
        closeCallRoom();

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
        streamedVideoContainerRef,
        transimittedVideoContainerRef,
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
