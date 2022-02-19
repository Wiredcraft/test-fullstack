import React from 'react';

type Props = {
  size: number;
};
export default function ClockIcon(props: Props) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  );
}
