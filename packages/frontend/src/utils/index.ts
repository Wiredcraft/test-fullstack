const formatTime = (time: string | number) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${hour}:${minute} ${year}/${month}/${day}`;
};

export default { formatTime };
