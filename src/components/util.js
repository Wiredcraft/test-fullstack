const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const EnMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export function formatTime(value, relative) {
  const then = new Date(value);

  if (then.toString() === "Invalid Date") {
    return null;
  }

  if (relative) {
    const now = new Date();
    const diff = now - then;

    if (diff < MINUTE) {
      return "Just now";
    }

    if (diff < HOUR) {
      return `${Math.round(diff / MINUTE)} m ago`;
    }

    if (diff < HOUR * 24) {
      return `${Math.round(diff / HOUR)} h ago`;
    }

    return `${EnMonths[then.getMonth()]} ${then.getDate()}`;
  }

  const year = then.getFullYear();
  const month = EnMonths[then.getMonth()];
  const day = then.getDate();
  const hour = then.getHours();
  const minute = then
    .getMinutes()
    .toString()
    .padStart(2, "0");

  return `${month} ${day} ${year} ${hour}:${minute}`;
}

export const getTimeString = date => {
  return [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map(str => String(str).padStart(2, "0"))
    .join(":");
};

export const merge = (dest, source, depth = 1) => {
  if (depth <= 1) {
    return { ...dest, ...source };
  }
  dest = { ...dest };
  for (let key in source) {
    dest[key] = merge(dest[key], source[key], depth - 1);
  }
  return dest;
};

export const completeUrl = path => {
  if (typeof window !== "undefined") {
    return `http://${window.location.hostname}:4000${path}`;
  }

  return `http://localhost:4000${path}`;
};

export const cx = (...args) => {
  let classNames = [];

  args.forEach(arg => {
    if (arg) classNames.push(arg);
  });

  return classNames.join(" ");
};
