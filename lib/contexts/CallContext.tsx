import { openCallRoomAtom, userAccountAtom } from "lib/atoms";
import { orderObject } from "lib/helper";
import { ISaveCall } from "lib/models";
import apiServices from "lib/services/apiServices";
import dateServices from "lib/services/dateService";
import { TUser } from "lib/types";
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
import { useRecoilState, useRecoilValue } from "recoil";

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
  callInfo: {
    from: string;
    to: string;
  };
  requestCall: (roomType: string, contact: TUser, caller: TUser) => void;
  answerCall: (roomType: string) => void;
  cancelCall: (to: string) => void;
}

interface ICancelCall {
  from: string;
  to: string;
  callType: string;
  missed: boolean;
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
  callInfo: {
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

  const [callInfo, setCallInfo] = useState({
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

    if (transimittedVideoContainerRef.current) {
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
      phoneCallAudioRingRef.current.currentTime = 0;
    }
  };

  const leaveCallRingsHandler = () => {
    stopRinging();
    if (cancelCallAudioRingRef.current) {
      cancelCallAudioRingRef.current.play();
    }
  };

  const saveCall = async (
    missed: boolean,
    isIncoming: boolean,
    isVideo: boolean,
    callerUsername: string,
    calledUsername: string
  ) => {
    const callerUser = await apiServices.findByTokenOrUsername(callerUsername);

    const calledUser = await apiServices.findByTokenOrUsername(calledUsername);

    if (!callerUser.error && !calledUser.error) {
      const outgoingCall: ISaveCall = {
        username: callerUser.response.id, //must be id (for changing)
        userProfileUrl: calledUser.response.userProfileUrl,
        date: dateServices.getFullDate(),
        time: dateServices.getTime(),
        missed,
        isIncoming,
        isVideo,
        calledUsername,
      };

      const incomingCall = {
        ...outgoingCall,
        username: calledUser.response.id,
        isIncoming: true,
        calledUsername: callerUsername,
      };

      console.log({ outgoingCall, incomingCall });

      Promise.all([
        await apiServices.savecall(orderObject(outgoingCall)),
        await apiServices.savecall(orderObject(incomingCall)),
      ]);
    }
  };

  const requestCall = useCallback(
    async (roomType: string, contact: TUser, caller: TUser) => {
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
          from: caller.username,
          to: contact.username,
          signal: data,
          callType: roomType,
        });

        setCallInfo({
          from: userAccount?.username!,
          to: contact.username,
          signal: null,
        });
      });

      peer.on("stream", (currentStream) => {
        if (streamedVideoContainerRef.current)
          streamedVideoContainerRef.current.srcObject = currentStream;
      });

      socket.on("callAccepted", (data) => {
        peer.signal(data.signal);
        setCallAccepted(true);

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
        from: userAccount?.username,
        to: callInfo.from,
        signal: data,
      });
    });

    peer.on("stream", (currentStream) => {
      if (streamedVideoContainerRef.current)
        streamedVideoContainerRef.current.srcObject = currentStream;
    });

    if (callInfo.signal) {
      peer.signal(callInfo.signal);
    }

    connectionRef.current = peer;
    setCallAccepted(true);
  };

  const closeCallRoom = () => {
    openCallRoom({ roomType: "audio" || "video", isOpened: false });
  };

  const cancelCall = async (to: string) => {
    socket.emit("cancelCall", {
      to,
      from: userAccount?.username,
      callType: callRoomOpened.roomType,
      missed: !callAccepted,
    });

    leaveCallRingsHandler();
    closeCallRoom();

    setIsinComingCall(false);
    setCallAccepted(false);

    if (cameraStream.current) {
      cameraStream.current
        .getTracks()
        .forEach((track: { stop: () => any }) => track.stop());
    }

    saveCall(
      !callAccepted,
      false,
      callRoomOpened.roomType === "video" || false,
      userAccount?.username || "",
      to
    );

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
      setIsinComingCall(true);
      openCallRoom({ roomType: data.callType, isOpened: true });

      setCallInfo({
        from: data.from,
        to: data.to,
        signal: data.signal,
      });

      if (!callAccepted) {
        navigator.vibrate([400, 400]);
      }
    });
  }, []);

  useEffect(() => {
    socket.on("leaveCall", (data: ICancelCall) => {
      leaveCallRingsHandler();
      closeCallRoom();

      if (cameraStream.current) {
        cameraStream.current
          .getTracks()
          .forEach((track: { stop: () => any }) => track.stop());
      }
      connectionRef.current?.destroy();
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
        callInfo,
      }}
    >
      <audio
        src="/phone-call-ring.wav"
        ref={phoneCallAudioRingRef}
        onEnded={async () => {
          isinComingCall ? cancelCall(callInfo.from) : cancelCall(callInfo.to);
        }}
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
