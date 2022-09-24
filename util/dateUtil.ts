// date format : YYYY-MM-dd

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
  return `${year}-${month}-${day}`;
};
