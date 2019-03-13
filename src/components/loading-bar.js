import React, { useState, useRef, useEffect } from "react";

export default ({ immediate, loading }) => {
  const [active, setActive] = useState(false);
  const timeoutRef = useRef();
  const animationFrameRef = useRef();
  const elementRef = useRef();
  const timeRef = useRef();
  const speedRef = useRef();
  const progressRef = useRef(0);

  const step = ts => {
    const last = timeRef.current ? timeRef.current : ts;
    timeRef.current = ts;

    const passedTime = ts - last;
    const p = Math.min(
      progressRef.current + passedTime * speedRef.current,
      100
    );

    progressRef.current = p;
    elementRef.current.style.transform = `translateX(${p - 100}%)`;

    if (p < 100) {
      animationFrameRef.current = window.requestAnimationFrame(step);
    } else {
      timeRef.current = null;
      progressRef.current = 0;
      animationFrameRef.current = window.requestAnimationFrame(fade);
    }
  };

  const fade = ts => {
    if (!timeRef.current) timeRef.current = ts;

    const o = Math.max(1 - (ts - timeRef.current) * 0.01, 0);

    elementRef.current.style.opacity = String(o);

    if (o > 0) {
      animationFrameRef.current = window.requestAnimationFrame(fade);
    } else {
      timeRef.current = null;
      animationFrameRef.current = null;
      setActive(false);
    }
  };

  const start = () => {
    setActive(true);
    speedRef.current = 0.1;
    animationFrameRef.current = window.requestAnimationFrame(step);
    timeoutRef.current = setTimeout(slow, 200); // to 20%
  };

  const slow = () => {
    if (speedRef.current < 0.5) {
      speedRef.current = 0.006;
      timeoutRef.current = setTimeout(still, 10000); // to 80%
    }
  };

  const still = () => {
    if (speedRef.current < 0.5) {
      // takes 200s to reach 100%, `fetch` should timeout and throw before that.
      speedRef.current = 0.0001;
    }
  };

  const finish = () => {
    speedRef.current = 0.5;
  };

  useEffect(
    () => {
      if (loading) {
        if (immediate) {
          start();
        } else {
          timeoutRef.current = setTimeout(start, 800);
          return () => clearTimeout(timeoutRef.current);
        }
      } else {
        finish();
      }
    },
    [loading]
  );

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    }
  }, []);

  if (!active) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9
      }}
    >
      <div
        ref={elementRef}
        style={{
          width: "100%",
          height: 2,
          transform: "translateX(-100%)",
          background: "rgb(0, 100, 252)"
        }}
      />
    </div>
  );
};
