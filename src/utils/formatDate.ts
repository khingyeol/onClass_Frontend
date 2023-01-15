export const formatDate = (date: string) => {
  const formatter = new Intl.DateTimeFormat("en", { month: "short" });
  const newDate = new Date(date);
  const month = formatter.format(newDate);
  return `${newDate.getDate()} ${month}. ${newDate.getFullYear()}`;
};

export const formatTime = (date: string) => {
  const newDate = new Date(date);
  return `${newDate
    .toLocaleTimeString("th")
    .replace(/(.*)\D\d+/, "$1")}`;
};
