import React from "react";
import { observer } from "mobx-react-lite";
import { useMst } from "store";
import { WeatherListGroupByDate } from "store/WeatherModel";
import moment from "moment";
import LineChart from "components/LIneChart";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { LL } from "constants/DateConstant";
import { useSearchParams } from "react-router-dom";

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
    setSearchParams({ ...params, ...{ dt: `${dt}` } });
    forecastStore.setSelectedDate(dt);
  };

  const getSelectedWeatherGroupByDate = (date: number | null) => {
    if (!date) {
      return [];
    }
    const index = getSelectedIndex(date);
    if (index > -1) {
      return getWeatherListByDateByIndex(index, date);
    }
    return [];
  };

  const getWeatherListByDateByIndex = (index: number, date: number) => {
    return weatherListGroupByDate[index][
      Object.keys(weatherListGroupByDate[index])[0]
    ];
  };

  const getSelectedIndex = (date: number) => {
    const formattedDate = moment(date * 1000).format(LL);
    return weatherListGroupByDate.findIndex(
      (weatherGroupByDate: WeatherListGroupByDate) =>
        Object.keys(weatherGroupByDate)[0] === formattedDate
    );
  };

  const setPreSelectedWeather = () => {
    if (selectedDate) {
      const selectedIndex = getSelectedIndex(selectedDate);
      if (selectedIndex !== 0) {
        const nextWeatherList = getWeatherListByDateByIndex(
          selectedIndex - 1,
          selectedDate
        );
        changeSearchParam(nextWeatherList?.[0].dt);
        forecastStore.setSelectedDate(nextWeatherList?.[0].dt);
      }
    }
  };

  const setNextSelectedWeather = () => {
    if (selectedDate) {
      const selectedIndex = getSelectedIndex(selectedDate);
      if (selectedIndex + 1 !== weatherListGroupByDate.length) {
        const nextWeatherList = getWeatherListByDateByIndex(
          selectedIndex + 1,
          selectedDate
        );
        changeSearchParam(nextWeatherList?.[0].dt);
        forecastStore.setSelectedDate(nextWeatherList?.[0].dt);
      }
    }
  };

  const selectedWeatherList = getSelectedWeatherGroupByDate(selectedDate);

  const data = selectedWeatherList.map((weather) => ({
    Time: moment(weather.dt * 1000).format("HH"),
    Temperature: weather.main.temp,
  }));

  const config = {
    data,
    xField: "Time",
    yField: "Temperature",
  };

  return (
    <div
      className="weather-graph"
      style={{ width: "500px", height: "250px", margin: "20px auto" }}
    >
      <div
        style={{
          margin: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          icon={<LeftOutlined />}
          onClick={setPreSelectedWeather}
        ></Button>
        <Button
          icon={<RightOutlined />}
          onClick={setNextSelectedWeather}
        ></Button>
      </div>
      <LineChart {...config} />
    </div>
  );
});

export default TempLineChart;
