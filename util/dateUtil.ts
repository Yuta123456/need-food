// date format : yyyy-MM-dd
const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const nextDate = (dateString: string) => {
  const date = new Date(Date.parse(dateString));
  date.setDate(date.getDate() + 1);
  return dateToString(date);
};

export const prevDate = (dateString: string) => {
  const date = new Date(Date.parse(dateString));
  date.setDate(date.getDate() - 1);
  return dateToString(date);
};

const dateToString = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
};

export const dateStrToDay = (dateStr: string) => {
  const date = new Date(dateStr);
  return week[date.getDay()];
};
