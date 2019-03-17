import { useEffect } from "react";

const COMMON_TITLE = "Hacker Talks";

let serverTitle = COMMON_TITLE;

function format(title) {
  if (!title) {
    return COMMON_TITLE;
  } else {
    return `${title} - ${COMMON_TITLE}`;
  }
}

export function rewind() {
  const recorded = serverTitle;
  serverTitle = COMMON_TITLE;
  return recorded;
}

export default title => {
  if (typeof window === "undefined") {
    serverTitle = format(title);
  }

  useEffect(
    () => {
      document.title = format(title);
      return () => {
        document.title = COMMON_TITLE;
      };
    },
    [title]
  );
};
