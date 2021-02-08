export const urlPrefix = function() {
  return process.env.URL_PREFIX;
}();

export const apiUrl = function() {
  return process.env.API_URL;
}();

export const wsUrl = function() {
  return process.env.WS_URL;
}();

export const timeAgo = function(timeCreated: number) {
  const periods = {
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000
  };

  const diff = Date.now() - timeCreated;

  if (diff > periods.month) {
    return Math.floor(diff / periods.month) + "m";
  }

  if (diff > periods.week) {
    return Math.floor(diff / periods.week) + "w";
  }

  if (diff > periods.day) {
    return Math.floor(diff / periods.day) + "d";
  }

  if (diff > periods.hour) {
    return Math.floor(diff / periods.hour) + "h";
  }

  if (diff > periods.minute) {
    return Math.floor(diff / periods.minute) + "m";
  }

  return "Just now";
}
