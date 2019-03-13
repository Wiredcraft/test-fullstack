import React from "react";

export default React.memo(props => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="rgb(142, 142, 142)"
    strokeWidth="2"
    strokeLinecap="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {Array.from(Array(12)).map((v, index) => (
      <line
        key={index}
        x1="12"
        y1="10.5"
        x2="12"
        y2="13.5"
        opacity="0.2"
        transform={`rotate(${index * 30} 12 12) translate(0 -7.5)`}
      >
        <animate
          attributeName="opacity"
          begin={`${index / 12}s`}
          dur="1s"
          values="1;0.2"
          calcMode="spline"
          keySplines="0.22 0.61 0.36 1"
          repeatCount="indefinite"
        />
      </line>
    ))}
  </svg>
));
