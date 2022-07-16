import { callRoomAtom } from "lib/atoms";
import React, {
  useCallback,
  useMemo,
  useContext,
  createContext,
  useRef,
  LegacyRef,
  useEffect,
  useState,
} from "react";
import { useRecoilValue } from "recoil";

interface IMouve {
  movingPatternRef: LegacyRef<HTMLDivElement> | null;
  isMoving: boolean;
  isCanceledCall: boolean;
  patternOutsideview: boolean;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchmouve: (e: React.TouchEvent) => void;
  onTouchend: (e: React.TouchEvent) => void;
}

const defaultContext: IMouve = {
  movingPatternRef: null,
  onTouchStart: () => null,
  onTouchmouve: () => null,
  onTouchend: () => null,
  isMoving: false,
  isCanceledCall: false,
  patternOutsideview: false,
};

const MouveOnScreenContext = createContext<IMouve>(defaultContext);
export const useMouveOnScreen = () => useContext(MouveOnScreenContext);

const MouveOnScreenProvider = ({ children }: any) => {
  const movingPatternRef = useRef<HTMLDivElement>(null);
  const [isMoving, setIsMoving] = useState(false);
  const [isCanceledCall, setIsCanceledCall] = useState(false);
  const [patternOutsideview, setPatternOutsideView] = useState(false);
  const isCallRoomMiniFied = useRecoilValue(callRoomAtom);

  const windowHeight = () => {
    if (typeof window !== undefined) {
      return window.innerHeight;
    }
  };
  const windowWidth = () => {
    if (typeof window !== undefined) {
      return window.innerWidth;
    }
  };

  useEffect(() => {
    if (movingPatternRef.current) {
      movingPatternRef.current.style.top = "0px";
    }
  }, []);

  useEffect(() => {
    console.log("minified status", isCallRoomMiniFied);
    if (!isCallRoomMiniFied && movingPatternRef.current) {
      movingPatternRef.current.style.top = "0px";
      movingPatternRef.current.style.bottom = "0px";
      movingPatternRef.current.style.left = "0px";
      movingPatternRef.current.style.right = "0px";
    }
  }, [isCallRoomMiniFied]);

  const patternDestination = useMemo(
    () => ({
      x: 0,
      y: 0,
    }),
    []
  );

  const mouvePattern = (e: { touches: { clientY: any; clientX: any }[] }) => {
    if (movingPatternRef.current) {
      if (e.touches[0].clientY > 0 && e.touches[0].clientX > 0) {
        setPatternOutsideView(false);
        movingPatternRef.current.style.top = `${e.touches[0].clientY}px`;
        movingPatternRef.current.style.left = `${e.touches[0].clientX}px`;
        patternDestination.x = e.touches[0].clientX;
        patternDestination.y = e.touches[0].clientY;
      }
      if (windowHeight()! && windowWidth()!) {
        if (
          e.touches[0].clientY >=
            windowHeight()! - movingPatternRef.current.offsetHeight ||
          e.touches[0].clientX >=
            windowWidth()! - movingPatternRef.current.offsetWidth
        ) {
          setPatternOutsideView(true);
        }
      }
    }
  };

  const onTouchStart = (e: any) => {
    setIsMoving(true);
    if (movingPatternRef.current) {
      movingPatternRef.current.style.top = `${e.touches[0].clientY}px`;
      movingPatternRef.current.style.left = `${e.touches[0].clientX}px`;
      patternDestination.x = e.touches[0].clientX;
      patternDestination.y = e.touches[0].clientY;
    }
  };

  const onTouchmouve = useCallback((e: any) => {
    mouvePattern(e);
  }, []);

  const onTouchend = useCallback(
    (e: any) => {
      setIsMoving(false);
      if (movingPatternRef.current) {
        if (patternOutsideview) {
          setIsCanceledCall(true);
        }
        movingPatternRef.current.style.top = `${patternDestination.y}px`;
        movingPatternRef.current.style.left = `${patternDestination.x}px`;
      }
    },
    [patternDestination.x, patternDestination.y, patternOutsideview]
  );

  return (
    <MouveOnScreenContext.Provider
      value={{
        onTouchmouve,
        movingPatternRef,
        onTouchend,
        isMoving,
        onTouchStart,
        isCanceledCall,
        patternOutsideview,
      }}
    >
      {children}
    </MouveOnScreenContext.Provider>
  );
};

export default MouveOnScreenProvider;
