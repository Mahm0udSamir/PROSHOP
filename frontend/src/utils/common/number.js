export const addDecimals = (num) =>
  Number((Math.round(num * 100) / 100).toFixed(2));
