import * as React from "react";

import "./index.css";

interface Props {
  action?: JSX.Element;
}

export default function Header({ action }: Props) {
  return (
    <div className="Header">
      <h1 className="Header__Title">Lightning Talk Polling</h1>
      {action ?? <div className="Header__Action">{action}</div>}
    </div>
  );
}
