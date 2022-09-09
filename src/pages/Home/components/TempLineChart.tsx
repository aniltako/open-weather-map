import React from "react";
import { observer } from "mobx-react-lite";
import { useMst } from "store";
import { WeatherListGroupByDate } from "store/ForecastModel";
import LineChart from "components/LIneChart";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { LL } from "constants/DateConstant";
import { useSearchParams } from "react-router-dom";
import { convertUnixToDate } from "utils/dateUtils";
import { NEXT, PRE } from "constants/variablesConstant";

type WEATHER_INDEX = "PRE" | "NEXT";

const TempLineChart = observer(() => {
  const { forecastStore } = useMst();
  const { weatherListGroupByDate, selectedDate } = forecastStore;
  const [searchParams, setSearchParams] = useSearchParams();

  const units = searchParams.get("units") || "c";

  const changeSearchParam = (dt: number) => {
    const params: { [key: string]: string } = {};
    if (units) {
      params.units = units;
    }
    // to maintain page state
    setSearchParams({ ...params, ...{ dt: `${dt}` } });
    forecastStore.setSelectedDate(dt);
  };

  const changeSelectedWeather = (value: WEATHER_INDEX) => {
    if (selectedDate) {
      let selectedIndex = getSelectedIndex(
        weatherListGroupByDate,
        selectedDate
      );

      if (value === PRE && selectedIndex !== 0) {
        selectedIndex = selectedIndex - 1;
      } else if (
        value === NEXT &&
        selectedIndex + 1 !== weatherListGroupByDate.length
      ) {
        selectedIndex = selectedIndex + 1;
      }
      const nextWeatherList = getWeatherListByDateByIndex(
        selectedIndex,
        weatherListGroupByDate
      );
      changeSearchParam(nextWeatherList?.[0].dt);
      forecastStore.setSelectedDate(nextWeatherList?.[0].dt);
    }
  };

  const data = forecastStore.selectedWeathers.map((weather) => ({
    Time: convertUnixToDate(weather.dt).format("HH"),
    Temperature: weather.main.temp,
  }));

  const config = {
    data,
    xField: "Time",
    yField: "Temperature",
  };

  return (
    <>
      <div
        style={{
          margin: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          icon={<LeftOutlined />}
          onClick={() => changeSelectedWeather(PRE)}
        ></Button>
        <Button
          icon={<RightOutlined />}
          onClick={() => changeSelectedWeather(NEXT)}
        ></Button>
      </div>
      <div
        className="weather-graph"
        style={{ width: "500px", height: "250px", margin: "20px auto" }}
      >
        <LineChart {...config} />
      </div>
    </>
  );
});

export default TempLineChart;

const getSelectedIndex = (
  weatherListGroupByDate: WeatherListGroupByDate[],
  date: number
) => {
  // formattedDate 'June 9 2014'
  const formattedDate = convertUnixToDate(date).format(LL);
  // weatherListGroupByDate [{'June 9 2014': [{dt, main, list, weather ....}]}]
  return weatherListGroupByDate.findIndex(
    (weatherGroupByDate: WeatherListGroupByDate) =>
      Object.keys(weatherGroupByDate)[0] === formattedDate
  );
};

const getWeatherListByDateByIndex = (
  index: number,
  weatherListGroupByDate: WeatherListGroupByDate[]
) => {
  return weatherListGroupByDate[index][
    Object.keys(weatherListGroupByDate[index])[0]
  ];
};
