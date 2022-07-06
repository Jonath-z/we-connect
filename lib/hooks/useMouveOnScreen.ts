import { useEffect, useRef } from "react";

// const useMouveOnScreen = () => {
//   const startPointRef = useRef<HTMLDivElement>(null);
//   const movingComponent = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (startPointRef.current) {
//       startPointRef.current.addEventListener("mousedown", (e) => {
//         console.log("mounse down", e);
//       });

//       startPointRef.current.onmousemove = (e) => {
//         console.log("mouse mouve event", e);
//       };

//       startPointRef.current.ontouchstart = (e) => {
//         console.log("touch start", e);
//       };

//       startPointRef.current.ontouchmove = (e) => {
//         console.log("touch mouve", e);
//       };
//     }
//   }, []);
//   return { startPointRef };
// };

// export default useMouveOnScreen;
