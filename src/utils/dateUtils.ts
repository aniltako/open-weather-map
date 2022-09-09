import moment from "moment";

export const convertUnixToDate = (value: number) => {
  return moment(value * 1000);
};
