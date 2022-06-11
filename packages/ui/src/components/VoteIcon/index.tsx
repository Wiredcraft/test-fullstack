const SIZE = 12;

export interface VoteIconProps {
  onClick: () => void;
}

export const VoteIcon = (props: VoteIconProps) => {
  return (
    <svg
      style={{ cursor: "pointer" }}
      width={SIZE}
      height={SIZE}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <polygon points="50,13 0,87 100,87" fill="#828282" />
    </svg>
  );
};
