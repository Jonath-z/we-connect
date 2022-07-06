import { callRoomAtom } from "lib/atoms";
import React, {
  useCallback,
  useMemo,
  useContext,
  createContext,
  useRef,
  LegacyRef,
  FC,
  useEffect,
  useState,
} from "react";
import { useRecoilValue } from "recoil";

interface IMouve {
  movingPatternRef: LegacyRef<HTMLDivElement> | null;
  isMoving: boolean;
  onTouchStart: () => void;
  onTouchmouve: (e: React.TouchEvent) => void;
  onTouchend: (e: React.TouchEvent) => void;
}

const defaultContext: IMouve = {
  movingPatternRef: null,
  onTouchStart: () => null,
  onTouchmouve: () => null,
  onTouchend: () => null,
  isMoving: false,
};

const MouveOnScreenContext = createContext<IMouve>(defaultContext);
export const useMouveOnScreen = () => useContext(MouveOnScreenContext);

const MouveOnScreenProvider: FC = ({ children }: any) => {
  const movingPatternRef = useRef<HTMLDivElement>(null);
  const [isMoving, setIsMoving] = useState(false);
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
      if (
        windowHeight() &&
        windowWidth() &&
        e.touches[0].clientY > 0 &&
        e.touches[0].clientX > 0
      ) {
        movingPatternRef.current.style.top = `${e.touches[0].clientY}px`;
        movingPatternRef.current.style.left = `${e.touches[0].clientX}px`;
        patternDestination.x = e.touches[0].clientX;
        patternDestination.y = e.touches[0].clientY;
      }
    }
  };

  const onTouchStart = () => {
    setIsMoving(true);
  };

  const onTouchmouve = useCallback((e: any) => {
    mouvePattern(e);
  }, []);

  const onTouchend = useCallback((e: any) => {
    setIsMoving(false);
    if (movingPatternRef.current) {
      if (patternDestination.x >= windowWidth()!) {
        console.log("reach max width");
        movingPatternRef.current.style.right = "30px";
        movingPatternRef.current.style.left = "unset";
        patternDestination.x = 0;
      }

      if (patternDestination.y >= windowHeight()!) {
        movingPatternRef.current.style.bottom = "0px";
        movingPatternRef.current.style.top = "unset";
        patternDestination.y = 0;
      }
      movingPatternRef.current.style.top = `${patternDestination.y}px`;
      movingPatternRef.current.style.left = `${patternDestination.x}px`;
    }
  }, []);

  return (
    <MouveOnScreenContext.Provider
      value={{
        onTouchmouve,
        movingPatternRef,
        onTouchend,
        isMoving,
        onTouchStart,
      }}
    >
      {children}
    </MouveOnScreenContext.Provider>
  );
};

export default MouveOnScreenProvider;
