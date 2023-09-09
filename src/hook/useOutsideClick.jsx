import { useEffect } from "react";

export const useOutsideClick = (ref, callBackFunction, expetionId) => {
  useEffect(() => {
    function handleMouseEvent(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.id !== expetionId
      ) {
        callBackFunction();
      }
    }
    document.addEventListener("mousedown", handleMouseEvent);
    return () => {
      document.removeEventListener("mousedown", handleMouseEvent);
    };
  }, [ref, callBackFunction, expetionId]);
  return;
};
