import React from "react";

const Icon = props => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  />
);

export const ChevronUp = props => (
  <Icon {...props}>
    <polyline points="18 15 12 9 6 15" />
  </Icon>
);
