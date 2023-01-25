// 14 Nov. 2021
export const formatDate = (date: string) => {
  if (!date) return ''; 
  const formatter = new Intl.DateTimeFormat("en", { month: "short" });
  const newDate = new Date(date);
  const month = formatter.format(newDate);
  return `${newDate.getDate()} ${month}. ${newDate.getFullYear()}`;
};

// (24hr)
// 02:48 
export const formatTime = (date: string) => {
  const newDate = new Date(date);
  return `${newDate
    .toLocaleTimeString("th")
    .replace(/(.*)\D\d+/, "$1")}`;
};
