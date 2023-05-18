// 14 Nov. 2021
export const formatDate = (date: string) => {
  if (!date) return ''; 
  const formatter = new Intl.DateTimeFormat("en", { month: "short" });
  const newDate = new Date(date);
  const month = formatter.format(newDate);
  return `${newDate.getDate()} ${month}. ${newDate.getFullYear()}`;
};

export const formatShortDate = (date: string) => {
  if (!date) return ''; 
  const formatter = new Intl.DateTimeFormat("en", { month: "short" });
  const newDate = new Date(date);
  const month = formatter.format(newDate);
  return `${newDate.getDate()} ${month}.`;
}

// (24hr)
// 02:48 
export const formatTime = (date: string) => {
  const newDate = new Date(date);
  return `${newDate
    .toLocaleTimeString("th")
    .replace(/(.*)\D\d+/, "$1")}`;
};
// 20 May. 2023 12:46
export const formatDateTime = (date: string, seperator?: string) => {
  return `${formatDate(date)} ${seperator ?? ''} ${formatTime(date)}`;
};

// 12:46 20May23