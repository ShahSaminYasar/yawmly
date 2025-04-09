export const minutesToTime = (minsValue, defaultFormat = false) => {
  let userData = JSON.parse(localStorage?.getItem("user"));
  let preferredTimeFormat = userData?.settings?.preferredTimeFormat || "t";

  let hours = Math.floor(minsValue / 60);
  let minutes = minsValue % 60;

  let result;

  if (defaultFormat) {
    result = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  } else if (preferredTimeFormat === "T") {
    result = `${hours}:${String(minutes).padStart(2, "0")}`;
  } else {
    let isPM = hours >= 12;
    hours = hours % 12 || 12;
    result = `${hours}:${String(minutes).padStart(2, "0")}${
      isPM ? "pm" : "am"
    }`;
  }

  // console.log("Converted time: ", result);

  return result;
};
