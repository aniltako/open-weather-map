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
        appid: process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY,
        cnt: 40,
      },
      ...params,
    },
  });
};
