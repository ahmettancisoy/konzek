export const splitCurrency = (str: string) => {
  if (str !== null && str !== undefined) {
    const strArr = str.split(",");
    let splittedStr = "";
    strArr.forEach((s) => (splittedStr += ` ${s}`));
    const trimmedStr = splittedStr.trim();
    return trimmedStr;
  }
};
