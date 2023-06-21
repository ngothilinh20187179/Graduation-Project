import dayjs from "dayjs";

export const getTimeUTC = (time?: string, format = "YYYY/MM/DD HH:mm") => {
  if (!time) return null;
  return dayjs(time).utc(true).local().format(format);
};
