export const minsDuration = (start, end) => {
  if (typeof start !== "number" || typeof end !== "number") return;
  let difference = end - start;

  let h = Math.floor(difference / 60);
  let m = difference % 60;

  let res = "";

  if (h > 0 && m === 0) {
    res = `${h} h`;
  } else if (h > 0) {
    res = `${h}h ${m}m`;
  } else {
    res = `${m} min`;
  }

  return res;
};
