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

interface IMouve {
  //   startPointRef: HTMLDivElement | null;
  movingPatternRef: LegacyRef<HTMLDivElement> | null;
  isMoving: boolean;
  //   onTouchStart: (e: React.TouchEvent) => void;
  onTouchmouve: (e: React.TouchEvent) => void;
  onTouchend: (e: React.TouchEvent) => void;
  //   onMouseDown: (e: React.MouseEvent) => void;
  onMouseMouve: (e: React.MouseEvent) => void;
}

const defaultContext: IMouve = {
  //   startPointRef: null,
  movingPatternRef: null,
  //   onTouchStart: () => null,
  onTouchmouve: () => null,
  onTouchend: () => null,
  isMoving: false,
  //   onMouseDown: () => null,
  onMouseMouve: () => null,
};

const MouveOnScreenContext = createContext<IMouve>(defaultContext);
export const useMouveOnScreen = () => useContext(MouveOnScreenContext);

const MouveOnScreenProvider: FC = ({ children }: any) => {
  const movingPatternRef = useRef<HTMLDivElement>(null);
  const [isMoving, setIsMoving] = useState(false);
  // const [windowHeight, setWindowHeight] = useState(0);
  // const [windowWidth, setWindowWidth] = useState(0);

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

  // useEffect(() => {
  //   window.onload = () => {
  //     console.log("window height", window.innerHeight);
  //     setWindowHeight(window.innerHeight);
  //     setWindowWidth(window.innerWidth);
  //   };
  // }, [isMoving]);

  useEffect(() => {
    if (movingPatternRef.current) {
      movingPatternRef.current.style.top = "0px";
    }
  }, []);

  const patternDestination = useMemo(
    () => ({
      x: 0,
      y: 0,
    }),
    []
  );

  const mouvePattern = (e: { touches: { clientY: any; clientX: any }[] }) => {
    console.log(windowHeight(), e.touches[0].clientY);
    if (
      windowHeight() &&
      windowWidth() &&
      movingPatternRef.current &&
      e.touches[0].clientY <= windowHeight()! &&
      e.touches[0].clientY > 0 &&
      e.touches[0].clientX > 0 &&
      e.touches[0].clientX < windowWidth()!
    ) {
      movingPatternRef.current.style.top = `${e.touches[0].clientY}px`;
      movingPatternRef.current.style.left = `${e.touches[0].clientX}px`;
      // movingPatternRef.current.style.transform = `translateX(${e.touches[0].clientX}px)`;
      patternDestination.x = e.touches[0].clientX;
      patternDestination.y = e.touches[0].clientY;
    }
  };

  const onTouchmouve = useCallback((e: any) => {
    setIsMoving(true);
    mouvePattern(e);
  }, []);

  const onTouchend = useCallback((e: any) => {
    setIsMoving(false);
    if (movingPatternRef.current) {
      movingPatternRef.current.style.transform = `translateY(${patternDestination.y}px)`;
      movingPatternRef.current.style.transform = `translateX(${patternDestination.x}px)`;
    }
  }, []);

  const onMouseMouve = (e: any) => {
    setIsMoving(true);
    console.log("mouse move", e);
    // mouvePattern(e);
  };

  return (
    <MouveOnScreenContext.Provider
      value={{
        onTouchmouve,
        onMouseMouve,
        movingPatternRef,
        onTouchend,
        isMoving,
      }}
    >
      {children}
    </MouveOnScreenContext.Provider>
  );
};

export default MouveOnScreenProvider;
