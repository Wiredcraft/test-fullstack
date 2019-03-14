import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const modalRoot =
  typeof document !== "undefined"
    ? document.getElementById("modal-root")
    : null;

export default ({ children }) => {
  const containerRef = useRef(null);

  if (!containerRef.current) {
    containerRef.current = document.createElement("div");
  }

  useEffect(() => {
    modalRoot.appendChild(containerRef.current);
    return () => {
      modalRoot.removeChild(containerRef.current);
    };
  }, []);

  return createPortal(children, containerRef.current);
};
