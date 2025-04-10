export const getDDayCount = (ddate) => {
  let now = new Date();
  let dday = new Date(ddate);

  now.setHours(0, 0, 0, 0);
  dday.setHours(0, 0, 0, 0);

  let diffInMs = dday?.getTime() - now?.getTime();
  let diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return diffInDays;
};
