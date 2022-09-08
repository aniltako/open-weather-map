import { asyncFunc } from "services";

export const getWeatherforecasts = <T>(params?: {
  q: string;
  units: string;
}) => {
  return asyncFunc<T>({
    method: "GET",
    url: `/data/2.5/forecast`,
    params: {
      ...{
        appid: "fde8db82492327c7a48adb569e5d1426",
        cnt: 40,
      },
      ...params,
    },
  });
};
