const formatDate = (date) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);

const formatTime = (time) =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(time);

const isSameDay = (d1, d2) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

// take date from DB in string format and make it dateTime format
const parseToDate = (value) => {
  if (!value) return null;
  if (value instanceof Date) return value;

  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? null : parsed;
};

export { formatDate, formatTime, isSameDay, parseToDate };
