import * as React from "react";

import "./index.css";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({ children, onClick, disabled = false }: Props) {
  return (
    <button
      type="button"
      className={`Button${disabled ? " Button--disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
